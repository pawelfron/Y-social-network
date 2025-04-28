# Y Social Network Backend

This is the backend for Y Social Network, a platform that allows users to create profiles, follow each other, and interact.

## Setting up the development environment

1. Clone the repository and navigate to the backend directory:

```bash
cd backend
```

2. Create a virtual environment and activate it:

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python -m venv venv
source venv/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the backend directory with the following content:

```
DJANGO_SECRET_KEY=your_secret_key_here
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
```

5. Generate a secret key for Django:

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Copy the output and use it as your `DJANGO_SECRET_KEY` in the `.env` file.

6. Apply migrations to create the database tables:

```bash
python manage.py migrate
```

7. Create a superuser for accessing the admin panel:

```bash
python manage.py createsuperuser
```

8. Run the development server:

```bash
python manage.py runserver
```

## Running the Tests

The project contains tests for authentication, user-related features, and comments. To run the tests:

1. Make sure your virtual environment is activated.

2. Run all tests:

```bash
python manage.py test
```

3. Run specific test modules:

```bash
# Run only authentication tests
python manage.py test api.tests.test_auth

# Run only user API tests
python manage.py test api.tests.test_user_api

# Run only comment API tests
python manage.py test api.tests.test_comment_api
```

4. Run a specific test class:

```bash
python manage.py test api.tests.test_comment_api.CommentAPITests
```

5. Run a specific test method:

```bash
python manage.py test api.tests.test_comment_api.CommentAPITests.test_create_comment
```

## Available API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Log in and get access and refresh tokens
- `POST /auth/refresh` - Refresh the access token
- `POST /auth/logout` - Log out (blacklist the token)

### User Profiles

- `GET /users` - Get all users (with optional search parameter: `/users?search=query`)
- `GET /users/{user_id}` - Get a user's profile
- `PUT /users/{user_id}/edit` - Edit a user's profile (only for the authenticated user)
- `GET /users/{user_id}/followers` - Get a list of a user's followers
- `GET /users/{user_id}/following` - Get a list of users that a user is following
- `POST /users/{user_id}/follow` - Follow a user
- `DELETE /users/{user_id}/unfollow` - Unfollow a user

### Posts

- `GET /posts` - Get all posts
- `POST /posts` - Create a new post
- `GET /posts/{postId}` - Get details of a specific post
- `PUT /posts/{postId}` - Update a post
- `DELETE /posts/{postId}` - Delete a post

### Comments

- `GET /posts/{post_id}/comments` - Get all top-level comments for a post (not including replies)
- `POST /comments` - Create a new comment or reply (include `parent` field to create a reply)
- `GET /comments/{comment_id}` - Get details of a specific comment, including its replies
- `PUT /comments/{comment_id}/edit` - Update a comment
- `DELETE /comments/{comment_id}/delete` - Delete a comment
- `GET /comments/{comment_id}/replies` - Get all replies to a specific comment
