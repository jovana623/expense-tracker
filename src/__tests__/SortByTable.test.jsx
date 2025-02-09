import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import { beforeEach, expect, it, vi } from "vitest";
import SortByTable from "../ui/SortByTable";
import "@testing-library/jest-dom";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});
let mockSearchParams;

beforeEach(() => {
  mockSearchParams = vi.fn();
  useSearchParams.mockReturnValue([new URLSearchParams(), mockSearchParams]);
});

it("should render dropdown component", () => {
  render(
    <MemoryRouter>
      <SortByTable />
    </MemoryRouter>
  );
  expect(screen.getByRole("combobox")).toBeInTheDocument();
});

it("show show correct starting option", () => {
  useSearchParams.mockReturnValue([
    new URLSearchParams("sortBy=date-desc"),
    mockSearchParams,
  ]);
  render(
    <MemoryRouter>
      <SortByTable />
    </MemoryRouter>
  );
  expect(screen.getByRole("combobox")).toHaveValue("date-desc");
});

it("should update params when value is changes", () => {
  render(
    <MemoryRouter>
      <SortByTable />
    </MemoryRouter>
  );
  const input = screen.getByRole("combobox");
  fireEvent.change(input, { target: { value: "amount-desc" } });
  expect(mockSearchParams).toHaveBeenCalledWith(
    new URLSearchParams("sortBy=amount-desc")
  );
});
