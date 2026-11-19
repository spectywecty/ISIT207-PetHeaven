import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderApp from "./renderApp";
import { sendToAdmin } from "../services/emailService";

// Never send real emails from tests
vi.mock("../services/emailService", () => ({
  sendToAdmin: vi.fn(() => Promise.resolve()),
}));

const member = { fullName: "Amy Tan", email: "amy@example.com", phone: "91234567" };
const seedMember = ({ loggedIn }) => {
  localStorage.setItem("ph_members", JSON.stringify([member]));
  if (loggedIn) localStorage.setItem("ph_current", JSON.stringify(member));
};

beforeEach(() => {
  localStorage.clear();
  sendToAdmin.mockClear();
});

describe("Browsing pets", () => {
  it("lists every pet", () => {
    renderApp("/pets");
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(6);
    expect(screen.getByText("6 pets found")).toBeInTheDocument();
  });

  it("narrows the list when searching by name", async () => {
    const user = userEvent.setup();
    renderApp("/pets");
    await user.type(screen.getByLabelText("Search pets"), "mochi");
    expect(screen.getByText("1 pet found")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Mochi" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Rocky" })).not.toBeInTheDocument();
  });

  it("reads filters from the URL", () => {
    renderApp("/pets?species=cat");
    expect(screen.getByText("3 pets found")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Rocky" })).not.toBeInTheDocument();
  });

  it("updates the list when a filter is changed", async () => {
    const user = userEvent.setup();
    renderApp("/pets");
    await user.selectOptions(screen.getByLabelText("Filter by size"), "large");
    expect(screen.getByText("1 pet found")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Rocky" })).toBeInTheDocument();
  });

  it("lets visitors favourite a pet and filter by favourites", async () => {
    const user = userEvent.setup();
    renderApp("/pets");
    await user.click(screen.getByRole("button", { name: "Add Mochi to favourites" }));
    expect(screen.getByRole("button", { name: "Remove Mochi from favourites" })).toBeInTheDocument();
    await user.click(screen.getByLabelText("Favourites only"));
    expect(screen.getByText("1 pet found")).toBeInTheDocument();
  });
});

describe("Membership and access control", () => {
  it("redirects visitors who are not logged in away from the adopt form", () => {
    renderApp("/adopt/1");
    expect(screen.getByRole("heading", { name: "Member Login" })).toBeInTheDocument();
  });

  it("returns a member to the adopt form after logging in", async () => {
    seedMember({ loggedIn: false });
    const user = userEvent.setup();
    renderApp("/adopt/2");
    await user.type(screen.getByLabelText("Email"), "amy@example.com");
    await user.click(screen.getByRole("button", { name: "Log in" }));
    expect(await screen.findByRole("heading", { name: "Adopt Rocky" })).toBeInTheDocument();
  });

  it("shows an error for an unknown email", async () => {
    const user = userEvent.setup();
    renderApp("/login");
    await user.type(screen.getByLabelText("Email"), "nobody@example.com");
    await user.click(screen.getByRole("button", { name: "Log in" }));
    expect(await screen.findByText(/couldn't find that email/i)).toBeInTheDocument();
  });
});

describe("Forms", () => {
  it("shows validation errors and sends nothing when the register form is empty", async () => {
    const user = userEvent.setup();
    renderApp("/register");
    await user.click(screen.getByRole("button", { name: "Register" }));
    expect(screen.getByText("Full name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Phone is required")).toBeInTheDocument();
    expect(sendToAdmin).not.toHaveBeenCalled();
  });

  it("emails the admin and logs the member in after a valid registration", async () => {
    const user = userEvent.setup();
    renderApp("/register");
    await user.type(screen.getByLabelText("Full name"), "Amy Tan");
    await user.type(screen.getByLabelText("Email"), "amy@example.com");
    await user.type(screen.getByLabelText("Phone"), "91234567");
    await user.click(screen.getByRole("button", { name: "Register" }));
    await waitFor(() => expect(sendToAdmin).toHaveBeenCalledTimes(1));
    expect(await screen.findByText("Hi, Amy")).toBeInTheDocument();
  });

  it("sends the pet and member details with an adoption request", async () => {
    seedMember({ loggedIn: true });
    const user = userEvent.setup();
    renderApp("/adopt/1");
    await user.selectOptions(screen.getByLabelText("Type of housing"), "hdb");
    await user.selectOptions(screen.getByLabelText("Do you have other pets?"), "no");
    await user.type(
      screen.getByLabelText("Tell us about your experience with pets"),
      "I have owned cats for ten years."
    );
    await user.click(screen.getByRole("button", { name: "Submit request" }));
    await waitFor(() =>
      expect(sendToAdmin).toHaveBeenCalledWith(
        expect.objectContaining({
          formType: "Adoption request",
          values: expect.objectContaining({ petName: "Mochi", memberEmail: "amy@example.com" }),
        })
      )
    );
  });
});
