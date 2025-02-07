import { beforeAll, expect, it, vi } from "vitest";
import { useCreateBudget } from "../features/budget/useCreateBudget";
import { useUpdateBudget } from "../features/budget/useUpdateBudget";
import { useBudgets } from "../features/budget/useBudgets";
import { useTypes } from "../features/type/useTypes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalContext } from "../ui/Modal";
import CreateBudgetForm from "../features/budget/CreateBudgetForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

vi.mock("../features/budget/useCreateBudget", () => {
  return {
    useCreateBudget: vi.fn(),
  };
});

vi.mock("../features/budget/useUpdateBudget", () => {
  return {
    useUpdateBudget: vi.fn(),
  };
});

vi.mock("../features/budget/useBudgets", () => {
  return {
    useBudgets: vi.fn(),
  };
});

vi.mock("../features/type/useTypes", () => {
  return {
    useTypes: vi.fn(),
  };
});

let mockCreateBudget;
let mockUpdateBudget;

beforeAll(() => {
  mockCreateBudget = vi.fn();
  useCreateBudget.mockReturnValue({
    createBudget: mockCreateBudget,
    isLoading: false,
  });

  mockUpdateBudget = vi.fn();
  useUpdateBudget.mockReturnValue({
    updateBudget: mockUpdateBudget,
    isLoading: false,
  });

  useTypes.mockReturnValue({
    types: [
      {
        id: 1,
        name: "Salary",
        color: "#16a34a",
        category: { id: 1, name: "Income", color: "#22c55e" },
      },
      {
        id: 2,
        name: "Rent",
        color: "#e11d48",
        category: { id: 2, name: "Expense", color: "#ef4444" },
      },
    ],
    isLoading: false,
  });

  useBudgets.mockReturnValue({
    budgets: [
      {
        id: 15,
        type: 1,
        amount: "200.00",
        date: "2025-01-15",
        period: "Monthly",
      },
      {
        id: 5,
        type: 2,
        amount: "1000.00",
        date: "2024-10-07",
        period: "Yearly",
      },
    ],
    isLoading: false,
  });
});

const queryClient = new QueryClient();

/* eslint-disable react/prop-types */
const Wrapper = ({ children, closeMock = vi.fn() }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalContext.Provider value={{ close: closeMock }}>
        {children}
      </ModalContext.Provider>
    </QueryClientProvider>
  );
};

it("should call createBudget when form is submited", async () => {
  render(<CreateBudgetForm />, { wrapper: Wrapper });

  fireEvent.change(screen.getByLabelText("Type"), {
    target: { value: "2" },
  });
  fireEvent.change(screen.getByLabelText("Budget"), {
    target: { value: "250" },
  });
  fireEvent.change(screen.getByLabelText("Period"), {
    target: { value: "Monthly" },
  });

  fireEvent.click(screen.getByRole("button", { name: "Add budget" }));

  await waitFor(() => {
    expect(mockCreateBudget).toBeCalledWith({
      type: 2,
      amount: "250",
      period: "Monthly",
    });
  });
});

it("should display validation error when amount field is empty", async () => {
  render(<CreateBudgetForm />, { wrapper: Wrapper });
  fireEvent.click(screen.getByRole("button", { name: "Add budget" }));

  const errors = await screen.findAllByText(/Budget can not be less than 0/i);
  expect(errors.length).toBeGreaterThan(0);
});

it("should close and reset form when Close button is clicked", async () => {
  render(<CreateBudgetForm />, { wrapper: Wrapper });
  const budgetField = screen.getByLabelText("Budget");

  fireEvent.change(budgetField, {
    target: { value: "250" },
  });

  const cancelButton = screen.getByRole("button", { name: /Cancel/i });
  fireEvent.click(cancelButton);

  await waitFor(() => {
    expect(budgetField.value).toBe("");
  });
});

it("should return spinner when types are loading", () => {
  useTypes.mockReturnValue({ types: [], isLoading: true });
  render(<CreateBudgetForm />, { wrapper: Wrapper });

  expect(screen.getByRole("spinner")).toBeInTheDocument();
});
