from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, filters, generics
from django.shortcuts import get_object_or_404

from ..models import Post
from ..serializers.post_serializers import (
    PostCreateSerializer,
    PostListSerializer,
    PostDetailSerializer,
    PostEditSerializer,
    PostDeleteSerializer
)

class PostListCreateView(APIView):
    """View to create a new post and get all posts"""
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        only_followed = request.query_params.get('onlyFollowed') == 'true'
        search_query = request.query_params.get('search')
        queryset = Post.objects.all().order_by('-created_at')

        if only_followed:
            followed_users = request.user.following.all().values_list('followed', flat=True)
            queryset = queryset.filter(author__in=followed_users)
        
        if search_query:
            queryset = queryset.filter(content__icontains=search_query)
        
        serializer = PostListSerializer(queryset, many=True)
        return Response(serializer.data)


    def post(self, request):
        serializer = PostCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostDetailEditDeleteView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self, postId):
        return get_object_or_404(Post, pk=postId)

    def get(self, request, postId):
        post = self.get_object(postId)
        serializer = PostDetailSerializer(post, context={'request': request})
        return Response(serializer.data)

    def put(self, request, postId):
        post = self.get_object(postId)
        if post.author != request.user:
            return Response({'detail': 'You can only update your own posts'}, status=status.HTTP_403_FORBIDDEN)
        serializer = PostEditSerializer(post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, postId):
        post = self.get_object(postId)
        if post.author != request.user:
            return Response({'detail': 'You can only delete your own posts'}, status=status.HTTP_403_FORBIDDEN)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PostLikesView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, postId):
        post = get_object_or_404(Post, pk=postId)
        post.likes.add(request.user)
        post.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def delete(self, request, postId):
        post: Post = get_object_or_404(Post, pk=postId)
        post.likes.remove(request.user)
        post.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

# class PostDetailView(generics.RetrieveAPIView):
#     """View to details of a specific post"""

#     queryset = Post.objects.all()
#     serializer_class = PostDetailSerializer
#     permission_classes = [IsAuthenticated]
#     lookup_url_kwarg = 'postId'


# class PostEditView(generics.UpdateAPIView):
#     """View to edit a specific post"""

#     queryset = Post.objects.all()
#     serializer_class = PostEditSerializer
#     permission_classes = [IsAuthenticated]
#     lookup_url_kwarg = 'postId'

#     def get_object(self):
#         post = super().get_object()

#         if post.author != self.request.user:
#             raise permissions.PermissionDenied("You can only update your own posts")

#         return post

# class PostDeleteView(generics.DestroyAPIView):
#     """View to delete a specific post"""
#     queryset = Post.objects.all()
#     serializer_class = PostDeleteSerializer
#     permission_classes = [IsAuthenticated]
#     lookup_url_kwarg = 'postId'

#     def get_object(self):
#         post = super().get_object()

#         if post.author != self.request.user:
#             raise permissions.PermissionDenied("You can only delete your own posts")
#         return post

