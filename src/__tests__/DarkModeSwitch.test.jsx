import { describe, expect, it, vi } from "vitest";
import { ThemeContext } from "../context/ThemeContext";
import DarkModeSwitch from "../features/header/DarkModeSwitch";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

vi.mock("react-icons/fi", async () => {
  const actual = await vi.importActual("react-icons/fi");
  return {
    ...actual,
    FiSun: (props) => <svg data-testid="sun-icon" {...props} />,
    FiMoon: (props) => <svg data-testid="moon-icon" {...props} />,
  };
});

const renderWithThemeContext = (
  ui,
  { darkMode = false, setDarkMode = () => {} } = {}
) => {
  return render(
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {ui}
    </ThemeContext.Provider>
  );
};

describe("DarkModeSwitch", () => {
  it("should render sun icon when mode is light", () => {
    renderWithThemeContext(<DarkModeSwitch />, { darkMode: false });
    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("moon-icon")).not.toBeInTheDocument();
  });

  it("should render moon icon when mode is dark", () => {
    renderWithThemeContext(<DarkModeSwitch />, { darkMode: true });
    expect(screen.queryByTestId("sun-icon")).not.toBeInTheDocument();
    expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
  });

  it("should toggle dark mode on switch", () => {
    const setDarkMode = vi.fn();
    renderWithThemeContext(<DarkModeSwitch />, {
      darkMode: false,
      setDarkMode,
    });
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(setDarkMode).toBeCalledWith(true);
  });
});
