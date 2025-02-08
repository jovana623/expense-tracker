import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import BalanceCard from "../features/balance/BalanceCard";
import "@testing-library/jest-dom";

vi.mock("../helpers/dateFunctions", () => ({
  formatDate: vi.fn(() => "7 February 2025"),
}));

it("renders balance card with props", () => {
  render(<BalanceCard title="Total Balance" balance={2500} color="green" />);
  expect(screen.getByText(/total balance/i)).toBeInTheDocument();
});

it("display percentage is provided", () => {
  render(
    <BalanceCard
      title="Total Balance"
      balance={2500}
      color="green"
      percentage={-2.5}
    />
  );
  expect(screen.getByText(/-2.5%/i)).toBeInTheDocument();
  expect(screen.getByText(/difference from average/i)).toBeInTheDocument();
});

it("does not display percentage when is not provided", () => {
  render(<BalanceCard title="Total Balance" balance={2500} color="green" />);
  expect(
    screen.queryByText(/difference from average/i)
  ).not.toBeInTheDocument();
});
