import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserCard from './UserCard';
import { BrowserRouter } from 'react-router-dom';
import { UserService } from '../../services/userService';
import { AuthService } from '../../services/authService';

jest.mock('../../services/userService');
jest.mock('../../services/authService');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const user = {
  id: 1,
  username: 'testuser',
  profile_photo: null,
};

describe('<UserCard />', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock getUserId to simulate logged-in user
    (AuthService.get_instance as jest.Mock).mockReturnValue({
      getUserId: () => 999,
    });

    // Mock getFollowing to simulate follow status
    (UserService.getFollowing as jest.Mock).mockResolvedValue([
      { user: { id: 1 } }
    ]);
  });

  test('renders user and follow button', async () => {
    render(
      <BrowserRouter>
        <UserCard {...user} />
      </BrowserRouter>
    );

    // Wait for follow check effect to complete
    await waitFor(() => {
      expect(screen.getByText('Unfollow')).toBeInTheDocument();
    });

    expect(screen.getByText(user.username)).toBeInTheDocument();
  });

  test('toggles follow status on button click', async () => {
    (UserService.unfollowUser as jest.Mock).mockResolvedValue({});

    render(
      <BrowserRouter>
        <UserCard {...user} />
      </BrowserRouter>
    );

    const button = await screen.findByRole('button', { name: /Unfollow/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(UserService.unfollowUser).toHaveBeenCalledWith(user.id);
    });
  });

  test('navigates to user profile on image click', async () => {
    render(
      <BrowserRouter>
        <UserCard {...user} />
      </BrowserRouter>
    );

    const img = await screen.findByRole('img');
    fireEvent.click(img);

    expect(mockNavigate).toHaveBeenCalledWith(`/profile/${user.id}`);
  });
});
