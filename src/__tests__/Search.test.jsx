import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import { beforeEach, expect, it, vi } from "vitest";
import Search from "../ui/Search";
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

it("should render search input", () => {
  render(
    <MemoryRouter>
      <Search />
    </MemoryRouter>
  );
  expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  expect(screen.getByRole("textbox")).toBeInTheDocument();
});

it("should show initial value from query params", () => {
  useSearchParams.mockReturnValue([
    new URLSearchParams("search=example"),
    mockSearchParams,
  ]);
  render(
    <MemoryRouter>
      <Search />
    </MemoryRouter>
  );
  expect(screen.getByRole("textbox")).toHaveValue("example");
});

it("should update params when input value changes", () => {
  render(
    <MemoryRouter>
      <Search />
    </MemoryRouter>
  );
  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "new search" } });
  expect(mockSearchParams).toHaveBeenCalledTimes(1);
  expect(mockSearchParams).toHaveBeenCalledWith(
    new URLSearchParams("search=new search")
  );
});
