import { PostService } from "../../../src/services/postService";
import MockAdapter from "axios-mock-adapter";
import { axiosInstance } from "../../../src/services/apiClient";
import {
  PostCreateData,
  PostDetails,
  PostInfo,
  PostSummary,
  PostUpdateData
} from "../../../src/interfaces/post";

const mock = new MockAdapter(axiosInstance);

describe("PostService", () => {
  afterEach(() => {
    mock.reset();
  });

  const postId = 1;

  test("searchPosts returns filtered posts", async () => {
    const mockPosts: PostDetails[] = [
      {
        id: 1,
        content: "Hello world",
        created_at: "",
        likes: [],
        likes_count: 0,
        author: { id: 1, username: "test", profile_photo: null, followers_count: 10 },
        image: "",
        is_own_post: false
      }
    ];

    mock.onGet(/\/posts\?onlyFollowed=.*&search=.*/).reply(200, mockPosts);

    const result = await PostService.searchPosts(true, "Hello");
    expect(result).toEqual(mockPosts);
  });

  test("getUserPosts filters posts by author id", async () => {
    const mockPosts: PostSummary[] = [
      {
        id: 1,
        content: "Post 1",
        created_at: "",
        author: { id: 42, username: "user1", profile_photo: null, followers_count: 10 },
        image: ""
      },
      {
        id: 2,
        content: "Post 2",
        created_at: "",
        author: { id: 99, username: "user2", profile_photo: null, followers_count: 5 },
        image: ""
      }
    ];

    mock.onGet("/posts").reply(200, mockPosts);

    const result = await PostService.getUserPosts(42);
    expect(result).toEqual([mockPosts[0]]);
  });

  test("createPost returns new post info", async () => {
    const newPost: PostCreateData = { content: "New post", image: null };
    const mockResponse: PostInfo = {
      id: 123,
      content: "New post",
      image: "",
      created_at: "",
      author: { id: 1, username: "tester", profile_photo: null, followers_count: 0 }
    };

    mock.onPost("/posts").reply(201, mockResponse);

    const result = await PostService.createPost(newPost);
    expect(result).toEqual(mockResponse);
  });

  test("updatePost returns updated post", async () => {
    const updateData: PostUpdateData = { content: "Updated post", image: "" };
    const mockResponse: PostInfo = {
      id: postId,
      content: "Updated post",
      image: "",
      created_at: "",
      author: { id: 1, username: "tester", profile_photo: null, followers_count: 0 }
    };

    mock.onPut(`/posts/${postId}`).reply(200, mockResponse);

    const result = await PostService.updatePost(postId, updateData);
    expect(result).toEqual(mockResponse);
  });

  test("deletePost sends delete request", async () => {
    mock.onDelete(`/posts/${postId}`).reply(204);

    await expect(PostService.deletePost(postId)).resolves.toBeUndefined();
  });

  test("likePost sends post request", async () => {
    mock.onPost(`/posts/${postId}/like`).reply(200);

    await expect(PostService.likePost(postId)).resolves.toBeUndefined();
  });

  test("unlikePost sends delete request", async () => {
    mock.onDelete(`/posts/${postId}/like`).reply(200);

    await expect(PostService.unlikePost(postId)).resolves.toBeUndefined();
  });
});
