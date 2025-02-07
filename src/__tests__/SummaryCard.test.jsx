import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import SummaryCard from "../features/dashboard/SummaryCard";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

it("renders SummaryCard with correct data", () => {
  render(
    <MemoryRouter>
      <SummaryCard
        icon="icon"
        name="Total income"
        amount={5000}
        percentage={10}
        isActive={false}
        reportPath="income"
      />
    </MemoryRouter>
  );
  expect(screen.getByText("TOTAL INCOME")).toBeInTheDocument();
  expect(screen.getByText(/5[,.]?\d*€/)).toBeInTheDocument();
  expect(screen.getByText("10%")).toBeInTheDocument();
});

it("shows card skeleton when loading", () => {
  render(
    <MemoryRouter>
      <SummaryCard isLoading={true} />
    </MemoryRouter>
  );
  expect(screen.getByRole("status")).toBeInTheDocument();
});

vi.spyOn(window, "open").mockImplementation(() => {});

it("opens url in new tab when check report is clicked", () => {
  const mockTime = "year";
  const mockMonth = "";
  const reportPath = "income";

  render(
    <MemoryRouter initialEntries={[`/?time=${mockTime}&month=${mockMonth}`]}>
      <SummaryCard
        name="Income"
        amount={5000}
        percentage={10}
        isActive={true}
        isLoading={false}
        reportPath={reportPath}
      />
    </MemoryRouter>
  );

  const toggleButton = screen.getByRole("button");
  fireEvent.click(toggleButton);

  const reportLink = screen.getByText("Check report");
  fireEvent.click(reportLink);

  expect(window.open).toHaveBeenCalledWith(
    `/report/${reportPath}?time=${mockTime}&month=${mockMonth}`,
    "_blank"
  );
});

it("display up arrow when percentage is positive", () => {
  render(
    <MemoryRouter>
      <SummaryCard
        name="income"
        amount={2000}
        percentage={10}
        isActive={false}
      />
    </MemoryRouter>
  );
  const percentageContainer = screen.getByTestId("arrow-icon").parentElement;
  expect(percentageContainer).toHaveClass("text-green-500");
});

it("applies cover effect", async () => {
  render(
    <MemoryRouter>
      <SummaryCard
        name="Savings"
        amount={1000}
        percentage={50}
        isActive={false}
      />
    </MemoryRouter>
  );
  const card = screen.getByTestId("summary-card");
  expect(card).not.toHaveClass("bg-green-500");
  await userEvent.hover(card);
  expect(card).toHaveClass("hover:bg-green-500");
});

it("applies active styles when isActive is true", () => {
  render(
    <MemoryRouter>
      <SummaryCard
        name="Savings"
        amount={1000}
        percentage={50}
        isActive={true}
      />
    </MemoryRouter>
  );

  const card = screen.getByTestId("summary-card");
  expect(card).toHaveClass("bg-green-500", "text-lightBg");
});

it("does not show report button when card is not active", () => {
  render(
    <MemoryRouter>
      <SummaryCard
        name="Savings"
        amount={1000}
        percentage={50}
        isActive={true}
      />
    </MemoryRouter>
  );
  expect(screen.queryByText("Check report")).not.toBeInTheDocument();
});
