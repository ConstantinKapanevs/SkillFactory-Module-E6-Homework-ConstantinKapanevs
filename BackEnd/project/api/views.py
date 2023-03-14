import os

from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response

from .models import ChatUser, Message, Room
from .serializers import ChatUserSerializer, MessageSerializer, RoomSerializer, UserSerializer


class AllUsersView(generics.ListAPIView):
    queryset = User.objects.order_by('-last_login')
    serializer_class = UserSerializer


class AllChatUsersView(generics.ListAPIView):
    queryset = ChatUser.objects.order_by('-name__last_login')
    serializer_class = ChatUserSerializer


class ChangeChatUserView(generics.UpdateAPIView):
    queryset = ChatUser.objects.all()
    serializer_class = ChatUserSerializer
    # parser_classes = [MultiPartParser]

    def put(self, request, pk):
        chat_user = self.get_object()
        user = User.objects.get(pk=chat_user.name.pk)
        print(request.data)
        user.username = request.data['name']['username']
        user.save()
        print(request.data['avatar'])
        os.system(f"copy {request.data['avatar']} media/{os.path.basename(request.data['avatar'])}")
        chat_user.avatar = request.data['avatar']
        chat_user.avatar = f"{os.path.basename(request.data['avatar'])}"
        chat_user.save()
        return Response({'message': 'Profile is changed'})


class AllRoomsView(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class RoomView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    def put(self, request, pk):
        room = self.get_object()
        guests = request.data['users']
        room.users.set(guests)
        room.save()
        return Response({'message': 'Some guests are changed'})


class AllMessagesView(generics.ListCreateAPIView):
    queryset = Message.objects.order_by('-created_at')
    serializer_class = MessageSerializer
