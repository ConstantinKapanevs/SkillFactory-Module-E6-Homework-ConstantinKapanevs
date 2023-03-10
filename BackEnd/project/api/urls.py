from django.urls import path, include

from api.views import AllUsersView, AllChatUsersView, AllRoomsView, AllMessagesView, ChangeChatUserView, RoomView
urlpatterns = [
    path('users', AllUsersView.as_view()),
    path('chatusers/<int:pk>', ChangeChatUserView.as_view()),
    path('chatusers', AllChatUsersView.as_view()),
    path('rooms/<int:pk>', RoomView.as_view()),
    path('rooms', AllRoomsView.as_view()),
    path('messages', AllMessagesView.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),  # Adding for login and logout
]
