from rest_framework import serializers
from .user_serializers import UserBasicSerializer
from ..models import Post

class PostCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating post"""

    class Meta:
        model = Post
        fields = ['id', 'content', 'image']
        read_only_fields = ['id']
    
    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        return Post.objects.create(**validated_data)


class PostDeleteSerializer(serializers.ModelSerializer):
    """Serializer for editing post"""

    class Meta:
        model = Post
        fields = ['id']
        read_only_fields = ['id']


class PostEditSerializer(serializers.ModelSerializer):
    """Serializer for deleting post"""

    class Meta:
        model = Post
        fields = ['id', 'content', 'image']
        read_only_fields = ['id']

class PostDetailSerializer(serializers.ModelSerializer):
    author = UserBasicSerializer(read_only=True)
    is_own_post = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'content', 'image', 'created_at', 'author', 'is_own_post', 'likes']
    
    def get_is_own_post(self, obj):
        request = self.context.get('request')
        return request.user == obj.author if request and request.user.is_authenticated else False

class PostListSerializer(serializers.ModelSerializer):
    """Serializer for post list (feed)"""

    author = UserBasicSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'content', 'image', 'created_at', 'author', 'likes']


