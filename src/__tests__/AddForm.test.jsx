import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Modal from "../ui/Modal";
import AddForm from "../ui/AddForm";
import "@testing-library/jest-dom";

vi.mock("react-icons/ai", () => {
  return {
    AiOutlinePlus: (props) => {
      return <svg data-testid="plus-icon" {...props} />;
    },
  };
});

const title = "Title";
const Child = () => <p>Child content</p>;

describe("AddForm", () => {
  it("should render component with correct data", () => {
    render(
      <Modal>
        <AddForm title={title}>
          <Child />
        </AddForm>
      </Modal>
    );
    const button = screen.getByRole("button", { name: "Add Title" });
    const icon = screen.getByTestId("plus-icon");
    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it("should open modal and display children when button is clicked", () => {
    render(
      <Modal>
        <AddForm title={title}>
          <Child />
        </AddForm>
      </Modal>
    );
    const button = screen.getByRole("button", { name: "Add Title" });
    expect(screen.queryByText("Child content")).not.toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });
});
