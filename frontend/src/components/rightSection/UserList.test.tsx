import React from 'react';
import { render, screen } from '@testing-library/react';
import UserList from './UserList';
import { BrowserRouter } from 'react-router-dom';

// Mock UserCard component to simplify test
jest.mock('./UserCard', () => (props: any) => {
  return <div data-testid="user-card">{props.username}</div>;
});

const mockUsers = [
  { id: 1, username: 'user1', profile_photo: null },
  { id: 2, username: 'user2', profile_photo: null },
];

describe('<UserList />', () => {
  test('renders correct number of UserCards', () => {
    render(
      <BrowserRouter>
        <UserList users={mockUsers} />
      </BrowserRouter>
    );

    const cards = screen.getAllByTestId('user-card');
    expect(cards).toHaveLength(mockUsers.length);
    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.getByText('user2')).toBeInTheDocument();
  });
});
