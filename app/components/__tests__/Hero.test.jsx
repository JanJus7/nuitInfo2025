import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, test, expect } from "vitest";
import Hero from "../Hero";

test("Hero renders title and triggers onQuizClick", async () => {
  const handle = vi.fn();
  render(<Hero onQuizClick={handle} />);

  // Title
  expect(screen.getByText(/Village Numérique Résistant/i)).toBeInTheDocument();

  // Click quiz button
  const btn = screen.getByRole("button", { name: /Essayer le Mini-Quiz/i });
  await userEvent.click(btn);
  expect(handle).toHaveBeenCalled();
});
