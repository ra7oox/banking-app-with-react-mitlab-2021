import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BrowserRouter } from "react-router-dom";
import App from "./App";

test("Tests Main App Navigation", () => {
  const { getByText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const homeLink = getByText("Home");
  const createAccountLink = getByText("Create Account");

  expect(homeLink.classList.contains("nav-link-active")).toBe(true);
  expect(createAccountLink.classList.contains("nav-link-active")).toBe(false);

  userEvent.click(createAccountLink);

  expect(homeLink.classList.contains("nav-link-active")).toBe(false);
  expect(createAccountLink.classList.contains("nav-link-active")).toBe(true);
});
