from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from ..models import Comment, Post, User
from ..serializers.comment_serializers import (
    CommentSerializer,
    CommentCreateSerializer,
    CommentUpdateSerializer
)

class CommentListView(generics.ListAPIView):
    """View to list all comments for a specific post"""
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        post_id = self.kwargs.get('post_id')
        # Only get top-level comments (not replies)
        return Comment.objects.filter(post_id=post_id, parent=None)

class CommentCreateView(generics.CreateAPIView):
    """View to create a new comment or reply"""
    serializer_class = CommentCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class CommentDetailView(generics.RetrieveAPIView):
    """View to get details of a specific comment"""
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_url_kwarg = 'comment_id'

class CommentUpdateView(generics.UpdateAPIView):
    """View to update a comment"""
    queryset = Comment.objects.all()
    serializer_class = CommentUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_url_kwarg = 'comment_id'
    
    def perform_update(self, serializer):
        comment = self.get_object()
        if comment.author != self.request.user:
            raise permissions.PermissionDenied("You can only update your own comments")
        serializer.save()

class CommentDeleteView(generics.DestroyAPIView):
    """View to delete a comment"""
    queryset = Comment.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    lookup_url_kwarg = 'comment_id'
    
    def perform_destroy(self, instance):
        if instance.author != self.request.user:
            raise permissions.PermissionDenied("You can only delete your own comments")
        instance.delete()

class CommentRepliesView(generics.ListAPIView):
    """View to list replies to a specific comment"""
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        comment_id = self.kwargs.get('comment_id')
        return Comment.objects.filter(parent_id=comment_id) 