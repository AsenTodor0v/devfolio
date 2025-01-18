from django.urls import path
from .views import UserRegisterView, BlogCreateView, BlogListView, BlogUpdateView,BlogDeleteView, UserUpdateView, BlogGetView,GetUsernameView
from . import views

urlpatterns = [
    path('register_user/', UserRegisterView.as_view(), name='register_user'),
    path('update_user/', UserUpdateView.as_view(), name='update_user'),
    path('get_username/', GetUsernameView.as_view(), name='get_username'),
    path('get_userinfo/<str:username>', views.get_userinfo, name='get_userinfo'),

    path('blogs/<slug:slug>/', BlogGetView.as_view(), name='blog'),
    path('create_blog/', BlogCreateView.as_view(), name='create_blog'),
    path('blog_list/', BlogListView.as_view(), name='blog_list'),
    path('update_blog/<int:pk>/', BlogUpdateView.as_view(), name='update_blog'),
    path('delete_blog/<int:pk>/', BlogDeleteView.as_view(), name='delete_blog'),
]