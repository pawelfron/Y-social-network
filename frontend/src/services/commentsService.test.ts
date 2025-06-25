import { CommentsService } from './commentsService';
import { axiosInstance } from './apiClient';
import MockAdapter from 'axios-mock-adapter';
import { Comment, CommentContent, CommentCreateData, CommentWithID } from '../interfaces/comment';

const mock = new MockAdapter(axiosInstance);

describe('CommentsService', () => {
  const postId = 1;
  const commentId = 123;

  afterEach(() => {
    mock.reset();
  });

  test('getPostComments returns a list of comments', async () => {
    const mockComments: Comment[] = [
      { id: 1, content: 'Nice!', author: { id: 1, username: 'john' }, created_at: '', post: 1 }
    ];

    mock.onGet(`/posts/${postId}/comments`).reply(200, mockComments);

    const result = await CommentsService.getPostComments(postId);
    expect(result).toEqual(mockComments);
  });

  test('addComment returns created comment with ID', async () => {
    const commentData: CommentCreateData = { post: postId, content: 'Hello!' };
    const mockResponse: CommentWithID = { ...commentData, id: 99 };

    mock.onPost('/comments').reply(201, mockResponse);

    const result = await CommentsService.addComment(commentData);
    expect(result).toEqual(mockResponse);
  });

  test('getComment returns a comment', async () => {
    const mockComment: Comment = {
      id: commentId,
      post: postId,
      content: 'Some comment',
      author: { id: 2, username: 'doe' },
      created_at: ''
    };

    mock.onGet(`/commnents/${commentId}`).reply(200, mockComment); // Typo preserved as in original code

    const result = await CommentsService.getComment(commentId);
    expect(result).toEqual(mockComment);
  });

  test('editComment returns updated content', async () => {
    const content: CommentContent = { content: 'Updated!' };

    mock.onPut(`/comments/${commentId}/edit`).reply(200, content);

    const result = await CommentsService.editComment(commentId, content);
    expect(result).toEqual(content);
  });

  test('deleteComment works without error', async () => {
    mock.onDelete(`/comments/${commentId}/delete`).reply(204);

    await expect(CommentsService.deleteComment(commentId)).resolves.toBeUndefined();
  });
});
