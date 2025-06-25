import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Profile from "../Profile";
import { UserProvider } from "../../../contexts/UserContext";
import { PostsProvider } from "../../../contexts/PostsListContext";
import * as userService from "../../../services/userService";
import * as postService from "../../../services/postService";
import { MemoryRouter, Route, Routes } from "react-router-dom";

jest.mock("../../../services/userService");
jest.mock("../../../services/postService");

const mockUser = {
  id: 1,
  username: "johndoe",
  first_name: "John",
  last_name: "Doe",
  profile_description: "Hello world!",
  profile_photo: null,
  date_joined: new Date().toISOString(),
  followers_count: 5,
  following_count: 3,
};

const mockPost = {
  id: 1,
  content: "Test post",
  image: "",
  created_at: new Date().toISOString(),
  likes: [],
  likes_count: 0,
  author: mockUser,
  is_own_post: true,
};

describe("Profile component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    userService.UserService.getUser = jest.fn().mockResolvedValue(mockUser);
    userService.UserService.getFollowing = jest.fn().mockResolvedValue([]);
    postService.PostService.getUserPosts = jest.fn().mockResolvedValue([mockPost]);
  });

  test("renders user profile correctly", async () => {
    render(
      <MemoryRouter initialEntries={["/profile/1"]}>
        <UserProvider>
          <PostsProvider>
            <Routes>
              <Route path="/profile/:userId" element={<Profile onOpenModal={() => {}}} />} />
            </Routes>
          </PostsProvider>
        </UserProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Ładowanie profilu/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/John Doe/)).toBeInTheDocument();
      expect(screen.getByText(/@johndoe/)).toBeInTheDocument();
    });
  });

  test("allows editing when Edit Profile clicked", async () => {
    render(
      <MemoryRouter initialEntries={["/profile/1"]}>
        <UserProvider>
          <PostsProvider>
            <Routes>
              <Route path="/profile/:userId" element={<Profile onOpenModal={() => {}}} />} />
            </Routes>
          </PostsProvider>
        </UserProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Edit Profile/)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Edit Profile/));

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/First name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Last name/i)).toBeInTheDocument();
    });
  });
});
