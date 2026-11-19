import usePageTitle from "../hooks/usePageTitle";
import Button from "../components/Button";

export default function NotFound() {
  usePageTitle("Page not found");
  return (
    <div className="center">
      <h1>404: page not found</h1>
      <p>This page wandered off. Let's get you back home.</p>
      <Button to="/">Go home</Button>
    </div>
  );
}
