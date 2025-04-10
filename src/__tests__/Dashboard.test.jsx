import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Dashboard from "../pages/Dashboard";
import { ModalContext } from "../ui/Modal";
import "@testing-library/jest-dom";

const queryClient = new QueryClient();

/* eslint-disable react/prop-types */
const Wrapper = ({ initialEntries }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/dashboard/savings" element={<Dashboard />} />
          <Route path="/dashboard/income" element={<Dashboard />} />
          <Route path="/dashboard/expenses" element={<Dashboard />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe("AddForm buttons", () => {
  it("shows 'Add Saving Goal' button when is savings page", () => {
    render(<Dashboard />, {
      wrapper: (props) => (
        <Wrapper {...props} initialEntries={["/dashboard/savings"]} />
      ),
    });
    expect(screen.getByText(/Add Saving Goal/i)).toBeInTheDocument();
    expect(screen.queryByText(/Add transaction/i)).not.toBeInTheDocument();
  });

  it("shows 'Add transaction' button when we are not on saving page", () => {
    render(<Dashboard />, {
      wrapper: (props) => (
        <Wrapper {...props} initialEntries={["/dashboard/income"]} />
      ),
    });

    expect(screen.getByText(/Add transaction/i)).toBeInTheDocument();
    expect(screen.queryByText(/Add saving goal/i)).not.toBeInTheDocument();
  });
});

describe("Time and month Filter", () => {
  it("shows time filter when is not on savings page", () => {
    render(<Dashboard />, {
      wrapper: (props) => (
        <Wrapper {...props} initialEntries={["/dashboard/income"]} />
      ),
    });

    const timeFilter = screen.getByRole("button", { name: /Month/i });
    expect(timeFilter).toBeInTheDocument();
  });

  it("shows month filter when is not on savings page", () => {
    render(<Dashboard />, {
      wrapper: (props) => (
        <Wrapper {...props} initialEntries={["/dashboard/income"]} />
      ),
    });
    const monthInput = screen.getByRole("textbox");
    expect(monthInput).toBeInTheDocument();
  });
});

it("opens AddTransaction component when add transaction button is clicked", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <ModalContext.Provider value={{ close: vi.fn() }}>
        <MemoryRouter>{<Dashboard />}</MemoryRouter>
      </ModalContext.Provider>
    </QueryClientProvider>
  );

  const addTransactionButton = screen.getByText(/Add Transaction/i);
  fireEvent.click(addTransactionButton);

  await waitFor(() => screen.getByText(/Add transaction/i));

  expect(screen.getByRole("form")).toBeInTheDocument();
});
