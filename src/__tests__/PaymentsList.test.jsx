import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, describe, expect, it, vi } from "vitest";
import { usePayments } from "../features/payments/usePayments";
import { render, screen } from "@testing-library/react";
import PaymentList from "../features/payments/PaymentsList";
import "@testing-library/jest-dom";
import { useDeletePayment } from "../features/payments/useDeletePayment";
import { formatDate } from "../helpers/dateFunctions";
import { getCurrencyEntity } from "../helpers/currencyFunctions";

vi.mock("../features/payments/useDeletePayment");
vi.mock("../features/payments/usePayments");
vi.mock("../helpers/dateFunctions", () => ({
  formatDate: vi.fn(),
}));

vi.mock("../helpers/currencyFunctions", () => ({
  getCurrencyEntity: vi.fn(),
}));

const queryClient = new QueryClient();

const mockSaving = { id: 1, name: "Test saving" };

/* eslint-disable react/prop-types */
const Wrapper = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const renderPaymentsList = () => {
  render(<PaymentList saving={mockSaving} currency="EUR" />, {
    wrapper: Wrapper,
  });
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("PaymentsList", () => {
  it("renders spinner when loading", () => {
    vi.mocked(usePayments).mockReturnValue({ payments: [], isLoading: true });
    vi.mocked(useDeletePayment).mockReturnValue({
      deletePayment: vi.fn(),
      isDeletingPayment: false,
    });

    renderPaymentsList();
    expect(screen.getByRole("spinner")).toBeInTheDocument();
  });

  it("renders empty message when there is no payments", () => {
    vi.mocked(usePayments).mockReturnValue({ payments: [], isLoading: false });
    vi.mocked(useDeletePayment).mockReturnValue({
      deletePayment: vi.fn(),
      isDeletingPayment: false,
    });

    renderPaymentsList();
    expect(
      screen.getByText(/You did not make any payment for Test saving/i)
    ).toBeInTheDocument();
  });

  it("renders a payment", () => {
    vi.mocked(usePayments).mockReturnValue({
      payments: [{ id: 1, amount: 150, date: "2024-01-01" }],
      isLoading: false,
    });
    vi.mocked(useDeletePayment).mockReturnValue({
      deletePayment: vi.fn(),
      isDeletingPayment: false,
    });
    vi.mocked(formatDate).mockImplementation(() => "formatted-date");
    vi.mocked(getCurrencyEntity).mockImplementation(() => "€");

    renderPaymentsList();
    expect(screen.getByText("150€")).toBeInTheDocument();
    expect(screen.getByText("formatted-date")).toBeInTheDocument();
  });
});
