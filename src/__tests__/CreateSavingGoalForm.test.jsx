import { beforeEach, expect, it, vi } from "vitest";
import { useUpdateSaving } from "../features/savings/useUpdateSaving";
import { useCreateSaving } from "../features/savings/useCreateSaving";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalContext } from "../ui/Modal";
import { MemoryRouter } from "react-router-dom";
import CreateSavingGoalForm from "../features/savings/CreateSavingGoalForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

vi.mock("../features/savings/useCreateSaving", () => {
  return {
    useCreateSaving: vi.fn(),
  };
});

vi.mock("../features/savings/useUpdateSaving", () => {
  return {
    useUpdateSaving: vi.fn(),
  };
});

let mockCreateSaving;
let mockUpdateSaving;

beforeEach(() => {
  mockCreateSaving = vi.fn();
  useCreateSaving.mockReturnValue({
    createSaving: mockCreateSaving,
    isLoading: false,
  });

  mockUpdateSaving = vi.fn((data) => {
    console.log("updateSaving called with:", data);
  });

  useUpdateSaving.mockReturnValue({
    updateSaving: mockUpdateSaving,
    isLoading: false,
  });
});

it("should call createSaving when form is submitted", async () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <ModalContext.Provider value={{ close: vi.fn() }}>
        <MemoryRouter>
          <CreateSavingGoalForm />
        </MemoryRouter>
      </ModalContext.Provider>
    </QueryClientProvider>
  );

  screen.debug();
  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: "Test saving" },
  });
  fireEvent.change(screen.getByLabelText(/goal/i), {
    target: { value: "1000" },
  });
  fireEvent.change(screen.getByLabelText(/target date/i), {
    target: { value: "2025-02-01" },
  });

  fireEvent.change(screen.getByLabelText(/description/i), {
    target: { value: "Test description" },
  });
  fireEvent.change(screen.getByLabelText(/color/i), {
    target: { value: "#ffffff" },
  });

  const form = screen.getByTestId("saving-form");
  fireEvent.submit(form);

  await waitFor(() => {
    expect(mockCreateSaving).toHaveBeenCalledTimes(1);
    expect(mockCreateSaving).toHaveBeenCalledWith({
      name: "Test saving",
      goal: "1000",
      target_date: "2025-02-01",
      description: "Test description",
      color: "#ffffff",
      status: "In progress",
    });
  });
});

it("should display error if required fields are empty", async () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <ModalContext.Provider value={{ close: vi.fn() }}>
        <MemoryRouter>
          <CreateSavingGoalForm />
        </MemoryRouter>
      </ModalContext.Provider>
    </QueryClientProvider>
  );
  const form = screen.getByTestId("saving-form");
  fireEvent.submit(form);

  const errors = await screen.findAllByText(/this field is required/i);
  expect(errors.length).toBeGreaterThan(0);
});

it("should close and reset form when Close is clicked", async () => {
  const closeMock = vi.fn();
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <ModalContext.Provider value={{ close: closeMock }}>
        <MemoryRouter>
          <CreateSavingGoalForm />
        </MemoryRouter>
      </ModalContext.Provider>
    </QueryClientProvider>
  );

  const nameField = screen.getByLabelText("Name");

  fireEvent.change(nameField, {
    target: { value: "Test saving" },
  });

  const cancelButton = screen.getByRole("button", { name: /Cancel/i });

  fireEvent.click(cancelButton);
  expect(closeMock).toBeCalled();

  await waitFor(() => {
    expect(nameField.value).toBe("");
  });
});

it("should populate form field when savingToUpdate is provided and call updateSaving", async () => {
  const savingToUpdate = {
    id: 1,
    name: "Test saving",
    amount: "1100.00",
    goal: "2000.00",
    target_date: "2025-05-15",
    started_at: "2024-01-01",
    status: "In progress",
    description: "Test description",
    color: "#FFA07A",
  };
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <ModalContext.Provider value={{ close: vi.fn() }}>
        <MemoryRouter>
          <CreateSavingGoalForm savingToUpdate={savingToUpdate} />
        </MemoryRouter>
      </ModalContext.Provider>
    </QueryClientProvider>
  );

  const nameField = screen.getByLabelText("Name");
  expect(nameField.value).toBe("Test saving");

  fireEvent.change(nameField, { target: { value: "Updated saving" } });

  const form = screen.getByTestId("saving-form");
  fireEvent.submit(form);

  await waitFor(() => {
    expect(mockUpdateSaving).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        name: "Updated saving",
        goal: "2000.00",
        color: "#FFA07A",
        description: "Test description",
        target_date: "2025-05-15",
      })
    );
  });
});
