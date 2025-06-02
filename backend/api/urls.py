from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView
from django.conf.urls.static import static
from django.conf import settings
from .views import auth_views, user_views, post_views, comment_views

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

    # Post endpoints
    path('posts', post_views.PostListCreateView.as_view(), name='post_list_create'),
    path('posts/<int:postId>', post_views.PostDetailEditDeleteView.as_view(), name='post_detail_edit_delete'),
    path('posts/<int:postId>/like', post_views.PostLikesView.as_view(), name='post_likes'),

    # Comment endpoints
    path('posts/<int:post_id>/comments', comment_views.CommentListView.as_view(), name='comment_list'),
    path('comments', comment_views.CommentCreateView.as_view(), name='comment_create'),
    path('comments/<int:comment_id>', comment_views.CommentDetailView.as_view(), name='comment_detail'),
    path('comments/<int:comment_id>/edit', comment_views.CommentUpdateView.as_view(), name='comment_update'),
    path('comments/<int:comment_id>/delete', comment_views.CommentDeleteView.as_view(), name='comment_delete'),
    # path('comments/<int:comment_id>/replies', comment_views.CommentRepliesView.as_view(), name='comment_replies'),

    # This is only for testing if authentication works; delete later
    path('useless', auth_views.UselessView.as_view(), name='test_protected_endpoint'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
