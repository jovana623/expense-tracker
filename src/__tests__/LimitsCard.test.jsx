import { expect, it, vi } from "vitest";
import { useDeleteBudget } from "../features/budget/useDeleteBudget";
import { fireEvent, render, screen } from "@testing-library/react";
import LimitsCard from "../features/budget/LimitsCard";
import "@testing-library/jest-dom";
import { ModalContext } from "../ui/Modal";

vi.mock("../features/budget/useDeleteBudget", () => ({
  useDeleteBudget: vi.fn(),
}));

const mockBudget = {
  id: 15,
  type: {
    id: 3,
    name: "Utilities",
    color: "#fb7185",
    category: { id: 2, name: "Expense", color: "#ef4444" },
  },
  amount: "200.00",
  date: "2025-01-15",
  period: "Monthly",
  total: 79.0,
  percentage: 39.5,
  transactions: [
    {
      id: 132,
      name: "Electrical bill",
      amount: 79.0,
      date: "2025-02-05",
      description: "Electrical bill february",
    },
  ],
};

it("renders card with correct data", () => {
  useDeleteBudget.mockReturnValue({ deleteBudget: vi.fn(), isLoading: false });
  render(<LimitsCard data={mockBudget} />);

  expect(screen.getByText(/utilities/i)).toBeInTheDocument();
  expect(screen.getByText(/40/i)).toBeInTheDocument();
});

it("shows spinner when loading is true", () => {
  useDeleteBudget.mockReturnValue({ deleteBudget: vi.fn(), isLoading: true });
  render(<LimitsCard data={mockBudget} />);
  expect(screen.getByRole("spinner")).toBeInTheDocument();
});

it("opens delete modal and confirm delete", () => {
  const deleteMock = vi.fn();

  useDeleteBudget.mockReturnValue({
    deleteBudget: deleteMock,
    isLoading: false,
  });

  render(
    <ModalContext.Provider value={{ close: vi.fn() }}>
      <LimitsCard data={mockBudget} />
    </ModalContext.Provider>
  );
  fireEvent.click(screen.getByTestId("menu-toggle"));
  const deleteButton = screen.getByRole("button", { name: /delete/i });
  fireEvent.click(deleteButton);

  expect(
    screen.getByText(/are you sure you want to delete/i)
  ).toBeInTheDocument();

  const confirmButton = screen.getByRole("button", { name: /delete/i });
  fireEvent.click(confirmButton);

  expect(deleteMock).toHaveBeenCalledWith(mockBudget.id);

  expect(
    screen.queryByText(/are you sure you want to delete/i)
  ).not.toBeInTheDocument();
});
