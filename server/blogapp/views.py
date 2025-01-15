from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView, DestroyAPIView , RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination

from .models import Blog
from .serializers import CustomUserSerializer, BlogSerializer, ProfileUpdateSerializer
from .permissions import IsOwner
# Create your views here.

class BlogListPagination(PageNumberPagination):
    page_size = 3


class UserRegisterView(CreateAPIView):
    serializer_class = CustomUserSerializer
    
    def perform_create(self, serializer):
        serializer.save()


class UserUpdateView(UpdateAPIView):
    serializer_class = ProfileUpdateSerializer        
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    

class BlogListView(ListAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    pagination_class = BlogListPagination


class BlogCreateView(CreateAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.validated_data['author'] = self.request.user
        serializer.save()


class BlogUpdateView(UpdateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def perform_update(self, serializer):
        serializer.save()
        
    
class BlogDeleteView(DestroyAPIView):
    queryset = Blog.objects.all()
    permission_classes = [IsAuthenticated, IsOwner]

    def perform_destroy(self, instance):
        instance.delete()

class BlogGetView(RetrieveAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    lookup_field = 'slug'