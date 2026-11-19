import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { AuthProvider } from "../context/AuthContext";
import { FavouritesProvider } from "../context/FavouritesContext";
import { ToastProvider } from "../context/ToastContext";

export default function renderApp(route = "/") {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <ToastProvider>
        <AuthProvider>
          <FavouritesProvider>
            <App />
          </FavouritesProvider>
        </AuthProvider>
      </ToastProvider>
    </MemoryRouter>
  );
}
