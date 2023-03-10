from django.contrib.auth.models import User
from rest_framework import serializers

from .models import ChatUser, Message, Room


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class ChatUserSerializer(serializers.ModelSerializer):
    name = UserSerializer()

    class Meta:
        model = ChatUser
        fields = ['id', 'name', 'avatar']


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'author', 'created_at', 'room', 'content']


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'name', 'created_at', 'author', 'users']


class RoomUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'users']
