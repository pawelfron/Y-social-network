import { UserService } from "../../../src/services/userService";
import MockAdapter from "axios-mock-adapter";
import { axiosInstance } from "../../../src/services/apiClient";
import {
  UserSummary,
  UserDetails,
  UserEditData,
  FollowManageData,
  userWithDate
} from "../../../src/interfaces/user";

const mock = new MockAdapter(axiosInstance);
const userId = 1;

describe("UserService", () => {
  afterEach(() => {
    mock.reset();
  });

  test("searchUsers returns matching users", async () => {
    const mockUsers: UserSummary[] = [
      { id: 1, username: "john", profile_photo: null }
    ];
    mock.onGet("/users?search=john").reply(200, mockUsers);

    const result = await UserService.searchUsers("john");
    expect(result).toEqual(mockUsers);
  });

  test("getUser returns user details", async () => {
    const mockUser: UserDetails = {
      id: userId,
      username: "john",
      email: "john@example.com",
      profile_photo: null,
      followers_count: 10,
      following_count: 5,
      is_followed: false
    };
    mock.onGet(`/users/${userId}`).reply(200, mockUser);

    const result = await UserService.getUser(userId);
    expect(result).toEqual(mockUser);
  });

  test("editUser sends form data and returns result", async () => {
    const updateData: UserEditData = {
      username: "updatedUser",
      profile_photo: new File([""], "avatar.png")
    };

    const mockResponse = {
      username: "updatedUser",
      profile_photo: null
    };

    mock.onPut(`/users/${userId}/edit`).reply(config => {
      expect(config.headers!["Content-Type"]).toContain("multipart/form-data");
      return [200, mockResponse];
    });

    const result = await UserService.editUser(userId, updateData);
    expect(result).toEqual(mockResponse);
  });

  test("followUser returns follow data", async () => {
    const mockFollow: FollowManageData = {
      following: true,
      followers_count: 11
    };
    mock.onPost(`/users/${userId}/follow`).reply(200, mockFollow);

    const result = await UserService.followUser(userId);
    expect(result).toEqual(mockFollow);
  });

  test("unfollowUser returns unfollow data", async () => {
    const mockUnfollow: FollowManageData = {
      following: false,
      followers_count: 9
    };
    mock.onDelete(`/users/${userId}/unfollow`).reply(200, mockUnfollow);

    const result = await UserService.unfollowUser(userId);
    expect(result).toEqual(mockUnfollow);
  });

  test("getFollowers returns list of followers", async () => {
    const followers: userWithDate[] = [
      {
        id: 1,
        username: "follower1",
        profile_photo: null,
        date_followed: "2024-01-01T00:00:00Z"
      }
    ];
    mock.onGet(`/users/${userId}/followers`).reply(200, followers);

    const result = await UserService.getFollowers(userId);
    expect(result).toEqual(followers);
  });

  test("getFollowing returns list of following", async () => {
    const following: userWithDate[] = [
      {
        id: 2,
        username: "followedUser",
        profile_photo: null,
        date_followed: "2024-01-02T00:00:00Z"
      }
    ];
    mock.onGet(`/users/${userId}/following`).reply(200, following);

    const result = await UserService.getFollowing(userId);
    expect(result).toEqual(following);
  });
});
