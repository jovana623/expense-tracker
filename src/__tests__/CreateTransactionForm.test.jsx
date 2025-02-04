import { beforeEach, expect, it, vi } from "vitest";
import { useCreateTransaction } from "../features/transactions/useCreateTransaction";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ModalContext } from "../ui/Modal";
import CreateTransactionForm from "../features/transactions/CreateTransactionForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTypes } from "../features/type/useTypes";
import "@testing-library/jest-dom";
import { useCategories } from "../features/category/useCategories";
import { MemoryRouter } from "react-router-dom";
import { useUpdateTransaction } from "../features/transactions/useUpdateTransaction";

vi.mock("../features/transactions/useCreateTransaction", () => {
  return {
    useCreateTransaction: vi.fn(),
  };
});

vi.mock("../features/transactions/useUpdateTransaction", () => ({
  useUpdateTransaction: vi.fn(),
}));

vi.mock("../features/type/useTypes", () => {
  return {
    useTypes: vi.fn(),
  };
});

vi.mock("../features/category/useCategories", () => {
  return {
    useCategories: vi.fn(),
  };
});

let mockCreateTransaction;
let mockUpdateTransaction;

beforeEach(() => {
  mockCreateTransaction = vi.fn();
  useCreateTransaction.mockReturnValue({
    createTransaction: mockCreateTransaction,
    isLoading: false,
  });

  mockUpdateTransaction = vi.fn();
  useUpdateTransaction.mockReturnValue({
    updateTransaction: mockUpdateTransaction,
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
  useCategories.mockReturnValue({
    categories: [
      { id: 1, name: "Income", color: "#22c55e" },
      { id: 2, name: "Expense", color: "#ef4444" },
    ],
    isLoading: false,
  });
});
 
it("should call createTransaction when form is submitted", async () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <ModalContext.Provider value={{ close: vi.fn() }}>
        <CreateTransactionForm />
      </ModalContext.Provider>
    </QueryClientProvider>
  );

  fireEvent.change(screen.getByLabelText("Name"), {
    target: { value: "Test transaction" },
  });
  fireEvent.change(screen.getByLabelText("Amount"), {
    target: { value: "100" },
  });
  fireEvent.change(screen.getByLabelText("Category"), {
    target: { value: "1" },
  });
  fireEvent.change(screen.getByLabelText("Type"), {
    target: { value: "2" },
  });
  fireEvent.change(screen.getByLabelText("Description"), {
    target: { value: "Test description" },
  });
  fireEvent.change(screen.getByLabelText("Date"), {
    target: { value: "2025-02-01" },
  });

  fireEvent.click(screen.getByText("Add transaction"));

  await waitFor(() => {
    expect(mockCreateTransaction).toBeCalledWith({
      name: "Test transaction",
      date: "2025-02-01",
      type: 2,
      amount: 100,
      description: "Test description",
    });
  });
});

it("should display validation error if required fields are empty", async () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <ModalContext.Provider value={{ close: vi.fn() }}>
        <MemoryRouter>
          <CreateTransactionForm />
        </MemoryRouter>
      </ModalContext.Provider>
    </QueryClientProvider>
  );

  const addTransactionButton = screen.getByRole("button", {
    name: /Add transaction/i,
  });

  fireEvent.click(addTransactionButton);

  const errors = await screen.findAllByText(/this field is required/i);

  expect(errors.length).toBeGreaterThan(0);
});

it("should close and reset form when Close is clicked", async () => {
  const closeMock = vi.fn();
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <ModalContext.Provider value={{ close: closeMock }}>
        <MemoryRouter>
          <CreateTransactionForm />
        </MemoryRouter>
      </ModalContext.Provider>
    </QueryClientProvider>
  );

  const nameField = screen.getByLabelText("Name");

  fireEvent.change(nameField, {
    target: { value: "Test transaction" },
  });

  const cancelButton = screen.getByRole("button", { name: /Cancel/i });

  fireEvent.click(cancelButton);
  expect(closeMock).toHaveBeenCalled();

  await waitFor(() => {
    expect(nameField.value).toBe("");
  });
});

it("should show spinner when types of categories are loading", () => {
  useTypes.mockReturnValue({ types: [], isLoading: true });
  useCategories.mockReturnValue({ categories: [], isLoading: true });

  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <ModalContext.Provider value={{ close: vi.fn() }}>
        <MemoryRouter>
          <CreateTransactionForm />
        </MemoryRouter>
      </ModalContext.Provider>
    </QueryClientProvider>
  );
  expect(screen.getByRole("spinner")).toBeInTheDocument();
});

it("should populate form fields when transactionToUpdate is provided to and call updateTransaction to update", async () => {
  const transactionToUpdate = {
    id: 123,
    name: "Old Transaction",
    date: "2025-01-01",
    type: { id: 1 },
    amount: "50",
    description: "Old description",
  };

  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <ModalContext.Provider value={{ close: vi.fn() }}>
        <CreateTransactionForm transactionToUpdate={transactionToUpdate} />
      </ModalContext.Provider>
    </QueryClientProvider>
  );

  const nameField = screen.getByLabelText("Name");

  expect(nameField.value).toBe("Old Transaction");

  fireEvent.change(nameField, { target: { value: "Updated Transaction" } });

  fireEvent.click(screen.getByText("Update transaction"));

  await waitFor(() => {
    expect(mockUpdateTransaction).toHaveBeenCalledWith({
      id: 123,
      name: "Updated Transaction",
      date: "2025-01-01",
      type: 1,
      amount: 50,
      description: "Old description",
    });
  });
});
