import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import NotificationDropdown from "../features/notifications/NotificationDropdown";
import "@testing-library/jest-dom";

let mockNotifications = [];

const mockRefetch = vi.fn();
const mockMarkAsRead = vi.fn();

vi.mock("../features/notifications/useNotifications", () => {
  return {
    useNotifications: () => ({
      notifications: mockNotifications,
      isLoading: false,
      refetch: mockRefetch,
    }),
  };
});

vi.mock("../features/notifications/useNotificationSocket", () => ({
  useNotificationSocket: vi.fn(),
}));

vi.mock("../features/notifications/useMarkAsRead", () => ({
  useMarkAsRead: () => ({
    markAsRead: mockMarkAsRead,
  }),
}));

describe("NotificationDropdown", () => {
  beforeEach(() => {
    mockNotifications = [
      {
        id: 1,
        message: "Test message",
        is_read: false,
        created_at: "2025-04-17T10:00:00Z",
      },
    ];
    mockMarkAsRead.mockClear();
  });
  it("should open dropdown and display notifications", () => {
    render(<NotificationDropdown userId={1} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByText(/notifications/i)).toBeInTheDocument();
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });

  it("should call mark as read when notification is clicked", () => {
    render(<NotificationDropdown userId={1} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const notification = screen.getByText(/test/i);
    fireEvent.click(notification);
    expect(mockMarkAsRead).toHaveBeenCalledWith(1);
  });

  it("should show message when there is no notifications", () => {
    mockNotifications = [];
    render(<NotificationDropdown userId={1} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByText(/no new notifications/i)).toBeInTheDocument();
  });

  it("should show badge with number of unread notifications", () => {
    mockNotifications = [
      {
        id: 1,
        message: "Msg 1",
        is_read: false,
        created_at: new Date().toISOString(),
      },
      {
        id: 2,
        message: "Msg 2",
        is_read: false,
        created_at: new Date().toISOString(),
      },
    ];
    render(<NotificationDropdown userId={1} />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("should apply blue border on unread notifications", () => {
    mockNotifications = [
      {
        id: 1,
        message: "Unread",
        is_read: false,
        created_at: new Date().toISOString(),
      },
      {
        id: 2,
        message: "Read",
        is_read: true,
        created_at: new Date().toISOString(),
      },
    ];
    render(<NotificationDropdown userId={1} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const unread = screen.getByText("Unread").closest("a");
    const read = screen.getByText("Read").closest("a");
    expect(unread.className).toContain("border-blue-500");
    expect(read.className).not.toContain("border-blue-500");
  });
});
