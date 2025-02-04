import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, it } from "vitest";
import Dashboard from "../pages/Dashboard";
import "@testing-library/jest-dom";

const queryClient = new QueryClient();

it("opens AddTransaction component when button is clicked on income, expense or balance page", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    </QueryClientProvider>
  );

  const addTransactionButton = screen.getByText(/Add Transaction/i);
  fireEvent.click(addTransactionButton);
  await waitFor(() => {
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });
});
