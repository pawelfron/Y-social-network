from rest_framework import serializers
from ..models import Comment, User
from .user_serializers import UserBasicSerializer

class CommentAuthorSerializer(serializers.ModelSerializer):
    """Simple serializer for comment authors"""
    class Meta:
        model = User
        fields = ['id', 'username', 'profile_photo']

class RecursiveCommentSerializer(serializers.Serializer):
    """Serializer for nested replies"""
    def to_representation(self, instance):
        serializer = CommentSerializer(instance, context=self.context)
        return serializer.data

class CommentSerializer(serializers.ModelSerializer):
    """Serializer for comments with nested replies"""
    author = CommentAuthorSerializer(read_only=True)
    replies = RecursiveCommentSerializer(many=True, read_only=True)
    is_reply = serializers.ReadOnlyField()
    reply_count = serializers.ReadOnlyField()
    
    class Meta:
        model = Comment
        fields = [
            'id', 'post', 'author', 'content', 'created_at', 
            'updated_at', 'parent', 'is_reply', 'reply_count', 'replies'
        ]
        read_only_fields = ['created_at', 'updated_at', 'is_reply', 'reply_count']

class CommentCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating comments"""
    
    class Meta:
        model = Comment
        fields = ['post', 'content', 'parent']

    def create(self, validated_data):
        # Set the author to the current user when authentication is enabled
        validated_data['author'] = self.context.get('request').user
        return super().create(validated_data)
        
class CommentUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating comment content"""
    
    class Meta:
        model = Comment
        fields = ['content'] 