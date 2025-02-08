import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import PaymentList from "../features/payments/PaymentsList";
import { useDeletePayment } from "../features/payments/useDeletePayment";
import "@testing-library/jest-dom";

vi.mock("../features/payments/useDeletePayment", () => ({
  useDeletePayment: vi.fn(),
}));

beforeEach(() => {
  useDeletePayment.mockReturnValue({
    deletePayment: vi.fn(),
    isDeletingPayment: false,
  });
});

it("show empty message when there is no payments for saving", () => {
  const mockSaving = { name: "Test saving", payments: [] };
  render(<PaymentList saving={mockSaving} />);
  expect(
    screen.getByText(/You did not make any payment for/i)
  ).toBeInTheDocument();
});

it("should render list of payments", () => {
  const mockSaving = {
    name: "Test saving",
    payments: [
      { id: "1", amount: 500, date: "2025-02-01" },
      { id: "2", amount: 1000, date: "2025-02-05" },
    ],
  };
  render(<PaymentList saving={mockSaving} />);
  expect(screen.getByText(/1 feb 2025/i)).toBeInTheDocument();
  expect(screen.getByText(/500/i)).toBeInTheDocument();
  expect(screen.getByText(/5 feb 2025/i)).toBeInTheDocument();
  expect(screen.getByText(/1.000/i)).toBeInTheDocument();
});

it("should call deletePayment when button is clicked", () => {
  const mockDeletePayment = vi.fn();
  useDeletePayment.mockReturnValue({
    deletePayment: mockDeletePayment,
    isDeletingPayment: false,
  });
  const mockSaving = {
    name: "Test saving",
    payments: [{ id: "1", amount: 500, date: "2025-02-01" }],
  };
  render(<PaymentList saving={mockSaving} />);
  const deleteButton = screen.getByRole("button");
  fireEvent.click(deleteButton);
  expect(mockDeletePayment).toHaveBeenCalled(1);
  expect(mockDeletePayment).toBeCalledWith("1");
});
