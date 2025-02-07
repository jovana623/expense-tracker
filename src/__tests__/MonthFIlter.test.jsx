import { render, screen, fireEvent } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import MonthFilter from "../ui/MonthFilter";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

let mockSearchParams = "month=2024-02";

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

it("renders month input", () => {
  render(
    <MemoryRouter>
      <MonthFilter />
    </MemoryRouter>
  );
  const monthInput = screen.getByRole("textbox");
  expect(monthInput).toBeInTheDocument();
});

it("displays correct month from searchParams", () => {
  render(
    <MemoryRouter initialEntries={["/dashboard?month=2024-02"]}>
      <MonthFilter />
    </MemoryRouter>
  );
  const monthInput = screen.getByRole("textbox");
  expect(monthInput.value).toBe("2024-02");
});

it("updates searchParams when month is changed", () => {
  render(
    <MemoryRouter initialEntries={["/dashboard?month=2024-02"]}>
      <MonthFilter />
    </MemoryRouter>
  );
  const monthInput = screen.getByRole("textbox");
  fireEvent.change(monthInput, { target: { value: "2024-03" } });

  const updatedParams = new URLSearchParams(mockSearchParams);
  expect(updatedParams.get("month")).toBe("2024-03");
});
