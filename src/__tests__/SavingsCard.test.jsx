import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import SavingCard from "../features/savings/SavingsCard";
import "@testing-library/jest-dom";

const mockSaving = {
  id: 1,
  name: "Vacation Fund",
  amount: 1100,
  goal: 2000,
  target_date: "2025-05-15",
  started_at: "2024-01-01",
  status: "In progress",
  color: "#FFA07A",
};

const mockCardChange = vi.fn();

it("renders saving details correctly", () => {
  render(
    <SavingCard
      saving={mockSaving}
      onCardChange={mockCardChange}
      activeSaving={2}
    />
  );
  expect(screen.getByText(/vacation fund/i)).toBeInTheDocument();
  expect(screen.getByText(/in progress/i)).toBeInTheDocument();
});

it("shows correct color for status", () => {
  render(
    <SavingCard
      saving={mockSaving}
      onCardChange={mockCardChange}
      activeSaving={2}
    />
  );
  const status = screen.getByText(/in progress/i);
  expect(status).toHaveClass("bg-blue-500");
});

it("displays correct percentage", () => {
  render(
    <SavingCard
      saving={mockSaving}
      onCardChange={mockCardChange}
      activeSaving={2}
    />
  );
  expect(screen.getByText(/55/)).toBeInTheDocument();
});
