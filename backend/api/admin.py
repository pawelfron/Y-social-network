from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Follow, Post, Comment

admin.site.register(User, UserAdmin)
admin.site.register(Follow)
admin.site.register(Post)
admin.site.register(Comment)
