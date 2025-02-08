import { expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Table from "../ui/Table";
import "@testing-library/jest-dom";

vi.mock("../features/transactions/useDeleteTransaction", () => ({
  useDeleteTransaction: () => ({
    deleteTransaction: vi.fn(),
  }),
}));

const mockData = [
  {
    id: 1,
    name: "Salary",
    amount: 2000,
    date: "2025-02-07",
    description: "Monthly salary",
    type: { name: "Income", category: { name: "Income" } },
  },
  {
    id: 2,
    name: "Groceries",
    amount: -150,
    date: "2025-02-05",
    description: "Supermarket shopping",
    type: { name: "Expense", category: { name: "Expense" } },
  },
];

it("renders table with data", () => {
  render(
    <MemoryRouter>
      <Table data={mockData} isLoading={false} />
    </MemoryRouter>
  );
  expect(screen.getByText(/salary/i)).toBeInTheDocument();
  expect(screen.getByText(/groceries/i)).toBeInTheDocument();
});

it("shows spinner when loading", () => {
  render(
    <MemoryRouter>
      <Table data={[]} isLoading={true} />
    </MemoryRouter>
  );
  expect(screen.getByRole("spinner")).toBeInTheDocument();
});

it("shows menu buttons", () => {
  render(
    <MemoryRouter>
      <Table data={mockData} isLoading={false} />
    </MemoryRouter>
  );
  fireEvent.click(screen.getAllByRole("button")[0]);

  expect(screen.getByText(/update/i)).toBeInTheDocument();
  expect(screen.getByText(/delete/i)).toBeInTheDocument();
  expect(screen.getByText(/details/i)).toBeInTheDocument();
});

it("opens details when modal is clicked", () => {
  render(
    <MemoryRouter>
      <Table data={mockData} isLoading={false} />
    </MemoryRouter>
  );
  fireEvent.click(screen.getAllByRole("button")[0]);
  fireEvent.click(screen.getByText(/details/i));

  expect(screen.getByText(/transaction details/i)).toBeInTheDocument();
});
