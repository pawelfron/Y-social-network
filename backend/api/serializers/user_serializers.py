from rest_framework import serializers
from ..models import User, Follow

class UserBasicSerializer(serializers.ModelSerializer):
    """Basic user information serializer"""
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'profile_photo', 'followers_count', 'following_count']
        
    def get_followers_count(self, obj):
        return obj.get_followers_count()
        
    def get_following_count(self, obj):
        return obj.get_following_count()

class UserProfileSerializer(serializers.ModelSerializer):
    """Full user profile serializer"""
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'first_name', 'last_name', 'email',
            'profile_photo', 'profile_description', 'date_joined',
            'followers_count', 'following_count', 'is_following'
        ]
        read_only_fields = ['id', 'date_joined', 'followers_count', 'following_count', 'is_following']
        
    def get_followers_count(self, obj):
        return obj.get_followers_count()
        
    def get_following_count(self, obj):
        return obj.get_following_count()
    
    def get_is_following(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Follow.objects.filter(follower=request.user, followed=obj).exists()
        return False

class UserUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating user profile"""
    
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'profile_photo', 'profile_description']
        
    def validate_username(self, value):
        user = self.context['request'].user
        if User.objects.exclude(pk=user.pk).filter(username=value).exists():
            raise serializers.ValidationError("This username is already in use.")
        return value

class FollowerSerializer(serializers.ModelSerializer):
    """Serializer for user followers"""
    user = UserBasicSerializer(source='follower', read_only=True)
    
    class Meta:
        model = Follow
        fields = ['user', 'created_at']

class FollowingSerializer(serializers.ModelSerializer):
    """Serializer for users being followed"""
    user = UserBasicSerializer(source='followed', read_only=True)
    
    class Meta:
        model = Follow
        fields = ['user', 'created_at']