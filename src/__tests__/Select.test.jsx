import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import Select from "../ui/Select";
import "@testing-library/jest-dom";

const mockData = [
  { id: "1", name: "Option 1" },
  { id: "2", name: "Option 2" },
  { id: "3", name: "Option 3" },
];

it("should render select component", () => {
  render(<Select data={mockData} onChange={() => {}} />);
  expect(screen.getByRole("combobox")).toBeInTheDocument();
});

it("should call onChange when option is selected", () => {
  const handleChange = vi.fn();
  render(<Select data={mockData} onChange={handleChange} />);
  const selectElement = screen.getByRole("combobox");
  fireEvent.change(selectElement, { target: { value: "2" } });
  expect(handleChange).toHaveBeenCalledTimes(1);
});
