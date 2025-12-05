import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, expect } from "vitest";
import Challenge from "../Challenge";

test("Challenge awards badges when answers are correct", async () => {
  render(<Challenge />);

  const user = userEvent.setup();

  // Click the expected correct choices (texts from component)
  await user.click(screen.getByText(/Non, on peut le réemployer ou installer Linux/i));
  await user.click(screen.getByText(/Permettent la modification et le partage/i));
  await user.click(screen.getByText(/Optimiser, réemployer et limiter la consommation/i));

  // Submit
  const submit = screen.getByRole("button", { name: /Valider/i });
  await user.click(submit);

  // Expect badges to appear
  expect(screen.getByText(/Badge Réemploi/i)).toBeInTheDocument();
  expect(screen.getByText(/Badge Libre/i)).toBeInTheDocument();
});
