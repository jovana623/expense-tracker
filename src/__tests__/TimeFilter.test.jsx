import { expect, it, vi } from "vitest";
import TimeFilter from "../ui/TimeFilter";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

let mockSearchParams = "";
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useSearchParams: () => [
      new URLSearchParams(mockSearchParams),
      (newParams) => {
        mockSearchParams = newParams;
      },
    ],
  };
});

it("renders all filter options", () => {
  render(
    <MemoryRouter>
      <TimeFilter />
    </MemoryRouter>
  );
  expect(screen.getByText(/month/i)).toBeInTheDocument();
  expect(screen.getByText(/year/i)).toBeInTheDocument();
  expect(screen.getByText(/all/i)).toBeInTheDocument();
});

it("updates searchParams when filter option is clicked", () => {
  mockSearchParams = "";
  render(
    <MemoryRouter>
      <TimeFilter />
    </MemoryRouter>
  );
  const yearButton = screen.getByRole("button", { name: "Year" });
  fireEvent.click(yearButton);

  expect(mockSearchParams.get("time")).toBe("year");
});

it("keep active option highlighted", () => {
  mockSearchParams = "time=month";
  render(
    <MemoryRouter>
      <TimeFilter />
    </MemoryRouter>
  );

  const monthButton = screen.getByRole("button", { name: "Month" });
  expect(monthButton).toHaveClass("bg-green-500");
});
