import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CurrentUser from "../../../src/components/leftSection/CurrentUser"; 
import { MemoryRouter } from "react-router-dom";

import * as userService from "../../../src/services/userService";
import { AuthService } from "../../../src/services/authService";

jest.mock("../../../src/services/userService");

const mockUser = {
  id: 1,
  username: "johndoe",
  first_name: "John",
  last_name: "Doe",
  profile_photo: null,
  profile_description: "Bio",
  date_joined: new Date().toISOString(),
  followers_count: 0,
  following_count: 0
};

describe("<CurrentUser />", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(AuthService, "get_instance").mockReturnValue({
      getUserId: () => 1,
      logout: jest.fn()
    });

    userService.UserService.getUser = jest.fn().mockResolvedValue(mockUser);
  });

  test("renders user info after fetching", async () => {
    render(
      <MemoryRouter>
        <CurrentUser onLogout={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/John/i)).toBeInTheDocument();
      expect(screen.getByText(/@johndoe/i)).toBeInTheDocument();
    });
  });

  test("shows dropdown menu on button click", async () => {
    render(
      <MemoryRouter>
        <CurrentUser onLogout={() => {}} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/John/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /.../i }));
    expect(screen.getByText(/Log out/i)).toBeInTheDocument();
  });

  test("calls logout when log out clicked", async () => {
    const mockLogout = jest.fn();
    jest.spyOn(AuthService, "get_instance").mockReturnValue({
      getUserId: () => 1,
      logout: mockLogout
    });

    render(
      <MemoryRouter>
        <CurrentUser onLogout={mockLogout} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/John/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /.../i }));
    fireEvent.click(screen.getByText(/Log out/i));

    expect(mockLogout).toHaveBeenCalled();
  });
});
