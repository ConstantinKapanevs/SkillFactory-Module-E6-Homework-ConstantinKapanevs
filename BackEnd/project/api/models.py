from django.contrib.auth.models import User
from django.db import models


class ChatUser(models.Model):
    name = models.OneToOneField(
        User, on_delete=models.CASCADE, verbose_name='Пользователь')
    avatar = models.ImageField(upload_to='media/', blank=True, verbose_name='Аватар')

    def __str__(self) -> str:
        return f'{self.name.username}'

    class Meta:
        verbose_name = 'Пользователь чата'
        verbose_name_plural = 'Пользователи чата'


class Message(models.Model):
    author = models.ForeignKey(ChatUser, on_delete=models.CASCADE, verbose_name='Автор')
    room = models.ForeignKey('Room', on_delete=models.CASCADE,
                             verbose_name='Комната', related_name='message')
    content = models.CharField(max_length=512, verbose_name='Сообщение')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    def __str__(self):
        return f'{self.content[:32]}'

    class Meta:
        verbose_name = 'Сообщение'
        verbose_name_plural = 'Сообщения'


class Room(models.Model):
    name = models.CharField(max_length=64, verbose_name='Имя чата')
    author = models.ForeignKey(ChatUser, on_delete=models.CASCADE,
                               verbose_name='Создатель чата', related_name='creator')
    users = models.ManyToManyField(ChatUser, verbose_name='Участники чата', related_name='users', blank=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    def __str__(self) -> str:
        return f'{self.name}'

    class Meta:
        verbose_name = 'Комната чата'
        verbose_name_plural = 'Комнаты чата'