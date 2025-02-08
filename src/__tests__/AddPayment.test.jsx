import { beforeAll, expect, it, vi } from "vitest";
import { useCreateSavingPayment } from "../features/payments/useCreateSavingPayment";
import { useType } from "../features/type/useType";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalContext } from "../ui/Modal";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddPayment from "../features/payments/AddPayment";
import "@testing-library/jest-dom";

vi.mock("../features/type/useType", () => {
  return {
    useType: vi.fn(),
  };
});

vi.mock("../features/payments/useCreateSavingPayment", () => {
  return {
    useCreateSavingPayment: vi.fn(),
  };
});

let mockCreatePayment;
let closeMock;

beforeAll(() => {
  mockCreatePayment = vi.fn();
  useCreateSavingPayment.mockReturnValue({
    createPayment: mockCreatePayment,
    isLoading: false,
  });

  closeMock = vi.fn();

  useType.mockReturnValue({
    type: { id: 16, name: "Savings", color: "#16a34a" },
    isLoading: false,
  });
});

const queryClient = new QueryClient();

/* eslint-disable react/prop-types */
const Wrapper = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalContext.Provider value={{ close: closeMock }}>
        {children}
      </ModalContext.Provider>
    </QueryClientProvider>
  );
};

const mockSaving = { id: 1, name: "Vacation Fund", goal: 1000, amount: 500 };

it("should show correct saving name", async () => {
  render(<AddPayment saving={mockSaving} />, { wrapper: Wrapper });
  expect(await screen.findByLabelText(/saving name/i)).toBeInTheDocument();
});

it("should call createPayment when form is submitted", async () => {
  render(<AddPayment saving={mockSaving} />, { wrapper: Wrapper });
  fireEvent.change(screen.getByLabelText(/amount/i), {
    target: { value: 200 },
  });
  fireEvent.change(screen.getByLabelText(/date/i), {
    target: { value: "2025-02-10" },
  });

  const addPayement = screen.getByRole("button", { name: /add payment/i });

  fireEvent.click(addPayement);
  console.log("Mock call:", mockCreatePayment.mock.calls);

  await waitFor(() => {
    expect(mockCreatePayment).toHaveBeenCalledWith({
      saving: 1,
      amount: "200",
      date: "2025-02-10",
    });
  });
});
