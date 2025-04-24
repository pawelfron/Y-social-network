from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView
from .views import auth_views, user_views

urlpatterns = [
    # Authentication endpoints
    path('auth/register', auth_views.RegisterUser.as_view(), name='register_user'),
    path('auth/login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout', TokenBlacklistView.as_view(), name='token_blacklist'),

    # User endpoints
    path('users', user_views.UserListView.as_view(), name='user_list'),
    path('users/<int:user_id>', user_views.UserProfileView.as_view(), name='user_profile'),
    path('users/<int:user_id>/edit', user_views.UserUpdateView.as_view(), name='user_update'),
    path('users/<int:user_id>/followers', user_views.UserFollowersView.as_view(), name='user_followers'),
    path('users/<int:user_id>/following', user_views.UserFollowingView.as_view(), name='user_following'),
    path('users/<int:user_id>/follow', user_views.FollowUserView.as_view(), name='follow_user'),
    path('users/<int:user_id>/unfollow', user_views.UnfollowUserView.as_view(), name='unfollow_user'),

    # This is only for testing if authentication works; delete later
    path('useless', auth_views.UselessView.as_view(), name='test_protected_endpoint'),
]