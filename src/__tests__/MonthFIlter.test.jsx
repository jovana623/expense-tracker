import { render, screen, fireEvent } from "@testing-library/react";
import { expect, it, vi, describe, beforeEach } from "vitest";
import MonthFilter from "../ui/MonthFilter";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

let mockSearchParamsObject = new URLSearchParams();
const mockSetSearchParams = vi.fn((newParams) => {
  mockSearchParamsObject = new URLSearchParams(newParams);
});

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useSearchParams: () => [mockSearchParamsObject, mockSetSearchParams],
  };
});

describe("MonthFilter", () => {
  beforeEach(() => {
    mockSearchParamsObject = new URLSearchParams();
    mockSetSearchParams.mockClear();
  });

  it("renders month input", () => {
    render(
      <MemoryRouter>
        <MonthFilter />
      </MemoryRouter>
    );
    const monthInput = screen.getByRole("textbox");
    expect(monthInput).toBeInTheDocument();
    expect(monthInput.value).toBe("");
  });

  it("displays correct initial month from searchParams", () => {
    mockSearchParamsObject = new URLSearchParams("month=2024-02&time=");

    render(
      <MemoryRouter>
        <MonthFilter />
      </MemoryRouter>
    );
    const monthInput = screen.getByRole("textbox");
    expect(monthInput.value).toBe("2024-02");
  });

  it("sets month param when initially empty", () => {
    render(
      <MemoryRouter>
        <MonthFilter />
      </MemoryRouter>
    );
    const monthInput = screen.getByRole("textbox");

    expect(monthInput.value).toBe("");
    expect(mockSearchParamsObject.has("month")).toBe(false);

    fireEvent.change(monthInput, { target: { value: "2024-05" } });

    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
    expect(mockSearchParamsObject.get("month")).toBe("2024-05");
  });
});
