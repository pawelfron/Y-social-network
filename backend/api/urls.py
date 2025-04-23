from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView
from .views import auth_views

urlpatterns = [
    path('auth/register', auth_views.RegisterUser.as_view(), name='register_user'),
    path('auth/login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout', TokenBlacklistView.as_view(), name='token_blacklist'),

    # This is only for testing if authentication works; delete later
    path('useless', auth_views.UselessView.as_view(), name='test_protected_endpoint'),
]