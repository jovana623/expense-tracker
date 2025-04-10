import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SavingsDetailCard from "../features/savings/SavingsDetailCard";
import "@testing-library/jest-dom";
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

vi.mock("../../helpers/currencyFunctions", () => ({
  getCurrencyEntity: (currency) => (currency === "EUR" ? "€" : "$"),
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
};

const queryClient = new QueryClient();

/* eslint-disable react/prop-types */
const Wrapper = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("SavingsDetailCars", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  it("renders saving details", () => {
    render(<SavingsDetailCard currentSaving={mockSaving} currency="EUR" />, {
      wrapper: Wrapper,
    });

    expect(screen.getByText(/you have reached/i)).toBeInTheDocument();
  });

  it("renders menu buttons", () => {
    render(<SavingsDetailCard currentSaving={mockSaving} currency="EUR" />, {
      wrapper: Wrapper,
    });
    const toggleButton = screen.getByTestId("menu-toggle");
    fireEvent.click(toggleButton);

    expect(screen.getByText(/update/i)).toBeInTheDocument();
    expect(screen.getByText(/delete/i)).toBeInTheDocument();
    expect(screen.getByText(/put on hold/i)).toBeInTheDocument();
  });

  it("shows message when goal is completed", () => {
    const completedSaving = { ...mockSaving, status: "Completed" };
    render(
      <SavingsDetailCard currentSaving={completedSaving} currency="EUR" />,
      {
        wrapper: Wrapper,
      }
    );
    expect(
      screen.getByText(/you have reached goal amount/i)
    ).toBeInTheDocument();
  });

  it("opens delete modal and confirm delete", () => {
    render(<SavingsDetailCard currentSaving={mockSaving} currency="EUR" />, {
      wrapper: Wrapper,
    });
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

  it("opens 'add to this saving' modal", async () => {
    render(<SavingsDetailCard currentSaving={mockSaving} currency="EUR" />, {
      wrapper: Wrapper,
    });
    const addButton = screen.getByRole("button", {
      name: /add to this saving/i,
    });
    fireEvent.click(addButton);
    expect(await screen.findByLabelText(/amount/i)).toBeInTheDocument();
  });

  it("should change status", () => {
    render(<SavingsDetailCard currentSaving={mockSaving} currency="EUR" />, {
      wrapper: Wrapper,
    });

    fireEvent.click(screen.getByTestId("menu-toggle"));
    const statusButton = screen.getByRole("button", { name: /put on hold/i });
    fireEvent.click(statusButton);
    expect(screen.getByText(/change status/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /put on hold/i }));
    expect(mockSavingStatus).toHaveBeenCalledTimes(1);
    expect(mockSavingStatus).toHaveBeenCalledWith({ id: 1, status: "On hold" });
  });
});
