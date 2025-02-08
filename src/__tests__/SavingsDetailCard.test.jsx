import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import SavingsDetailCard from "../features/savings/SavingsDetailCard";
import "@testing-library/jest-dom";
import { ModalContext } from "../ui/Modal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("../features/savings/useDeleteSaving", () => {
  return {
    default: vi.fn(() => ({
      mutate: vi.fn(),
      isLoading: false,
    })),
  };
});

vi.mock("../features/payments/useDeletePayment", () => ({
  useDeletePayment: vi.fn(() => ({
    deletePayment: vi.fn(),
    isDeletingPayment: false,
  })),
}));

vi.mock("../features/payments/useCreateSavingPayment", () => ({
  useCreateSavingPayment: vi.fn(() => ({
    createPayment: vi.fn(),
    isLoading: false,
  })),
}));

const mockSavingStatus = vi.fn();
vi.mock("../features/savings/useUpdateStatus", () => ({
  useUpdateStatus: () => ({
    savingStatus: mockSavingStatus,
    isLoading: false,
  }),
}));

const mockSaving = {
  id: 1,
  name: "Vacation fund",
  amount: 1100,
  goal: 2000,
  target_date: "2025-05-15",
  started_at: "2024-01-01",
  status: "In progress",
  description: "Saving for a vacation trip",
  color: "#FFA07A",
  payments: [{ id: 10, amount: 150, date: "2024-08-22", saving: 1 }],
};

it("renders saving details", () => {
  render(<SavingsDetailCard saving={mockSaving} />);

  expect(screen.getByText(/you have reached/i)).toBeInTheDocument();
});

it("renders menu buttons", () => {
  render(<SavingsDetailCard saving={mockSaving} />);
  const toggleButton = screen.getByTestId("menu-toggle");
  fireEvent.click(toggleButton);

  expect(screen.getByText(/update/i)).toBeInTheDocument();
  expect(screen.getByText(/delete/i)).toBeInTheDocument();
  expect(screen.getByText(/put on hold/i)).toBeInTheDocument();
});

it("shows message when goal is completed", () => {
  const completedSaving = { ...mockSaving, status: "Completed" };
  render(<SavingsDetailCard saving={completedSaving} />);
  expect(screen.getByText(/you have reached goal amount/i)).toBeInTheDocument();
});

it("opens delete modal and confirm delete", () => {
  render(
    <ModalContext.Provider value={{ close: vi.fn() }}>
      <SavingsDetailCard saving={mockSaving} />
    </ModalContext.Provider>
  );

  fireEvent.click(screen.getByTestId("menu-toggle"));
  const deleteButton = screen.getByRole("button", { name: /delete/i });
  fireEvent.click(deleteButton);
  expect(
    screen.getByText(/Are you sure you want to delete/i)
  ).toBeInTheDocument();
  const confirmButton = screen.getByRole("button", { name: /delete/i });
  fireEvent.click(confirmButton);
  expect(
    screen.queryByText(/Are you sure you want to delete/i)
  ).not.toBeInTheDocument();
});

it("opens 'See details' modal", () => {
  render(
    <ModalContext.Provider value={{ close: vi.fn() }}>
      <SavingsDetailCard saving={mockSaving} />
    </ModalContext.Provider>
  );
  const detailsButton = screen.getByRole("button", { name: /see details/i });
  fireEvent.click(detailsButton);
  expect(screen.getByText(/amount/i)).toBeInTheDocument();
  expect(screen.getByText(/date/i)).toBeInTheDocument();
});

it("opens 'add to this saving' modal", async () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <ModalContext.Provider value={{ close: vi.fn() }}>
        <SavingsDetailCard saving={mockSaving} />
      </ModalContext.Provider>
    </QueryClientProvider>
  );
  const addButton = screen.getByRole("button", { name: /add to this saving/i });
  fireEvent.click(addButton);
  expect(await screen.findByLabelText(/amount/i)).toBeInTheDocument();
});

it("should change status", () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <ModalContext.Provider value={{ close: vi.fn() }}>
        <SavingsDetailCard saving={mockSaving} />
      </ModalContext.Provider>
    </QueryClientProvider>
  );

  fireEvent.click(screen.getByTestId("menu-toggle"));
  const statusButton = screen.getByRole("button", { name: /put on hold/i });
  fireEvent.click(statusButton);
  expect(screen.getByText(/change status/i)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /put on hold/i }));
  expect(mockSavingStatus).toHaveBeenCalledTimes(1);
  expect(mockSavingStatus).toHaveBeenCalledWith({ id: 1, status: "On hold" });
});
