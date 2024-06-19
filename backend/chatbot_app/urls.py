
from django.urls import path
from .views import MessageListView

urlpatterns = [
    path('messages/', MessageListView.as_view(), name='message-list'),
    path('messages/<int:user_id>/', MessageListView.as_view(), name='message-list-user'),]
