from rest_framework import generics, status, permissions, filters
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from ..models import User, Follow
from ..serializers.user_serializers import (
    UserBasicSerializer,
    UserProfileSerializer,
    UserUpdateSerializer,
    FollowerSerializer,
    FollowingSerializer
)

class UserProfileView(generics.RetrieveAPIView):
    """View to retrieve a user's profile"""
    serializer_class = UserProfileSerializer
    queryset = User.objects.all()
    lookup_url_kwarg = 'user_id'

class UserUpdateView(generics.UpdateAPIView):
    """View to update a user's profile"""
    serializer_class = UserUpdateSerializer
    parser_classes = [MultiPartParser, FormParser]
    queryset = User.objects.all()
    lookup_url_kwarg = 'user_id'
    
    def get_object(self):
        user_id = self.kwargs.get('user_id')
        user = get_object_or_404(User, id=user_id)
        
        # Only allow users to update their own profiles
        if user.id != self.request.user.id:
            raise PermissionDenied("You can only update your own profile")
        return user

class UserListView(generics.ListAPIView):
    """View to list all users with optional search"""
    serializer_class = UserBasicSerializer
    queryset = User.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'first_name', 'last_name', 'profile_description']

class UserFollowersView(generics.ListAPIView):
    """View to list a user's followers"""
    serializer_class = FollowerSerializer
    
    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        user = get_object_or_404(User, id=user_id)
        return Follow.objects.filter(followed=user).select_related('follower')

class UserFollowingView(generics.ListAPIView):
    """View to list users being followed by a user"""
    serializer_class = FollowingSerializer
    
    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        user = get_object_or_404(User, id=user_id)
        return Follow.objects.filter(follower=user).select_related('followed')

class FollowUserView(APIView):
    """View to follow a user"""
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, user_id):
        user_to_follow = get_object_or_404(User, id=user_id)
        
        # Prevent following oneself
        if request.user.id == user_to_follow.id:
            return Response(
                {"detail": "You cannot follow yourself"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if already following
        if Follow.objects.filter(follower=request.user, followed=user_to_follow).exists():
            return Response(
                {"detail": "You are already following this user"},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        # Create the follow relationship
        Follow.objects.create(follower=request.user, followed=user_to_follow)
        
        return Response(
            {"detail": f"You are now following {user_to_follow.username}"},
            status=status.HTTP_201_CREATED
        )

class UnfollowUserView(APIView):
    """View to unfollow a user"""
    permission_classes = [permissions.IsAuthenticated]
    
    def delete(self, request, user_id):
        user_to_unfollow = get_object_or_404(User, id=user_id)
        
        # Check if actually following
        follow_relationship = Follow.objects.filter(
            follower=request.user, 
            followed=user_to_unfollow
        )
        
        if not follow_relationship.exists():
            return Response(
                {"detail": "You are not following this user"},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        # Delete the follow relationship
        follow_relationship.delete()
        
        return Response(
            {"detail": f"You have unfollowed {user_to_unfollow.username}"},
            status=status.HTTP_204_NO_CONTENT
        )