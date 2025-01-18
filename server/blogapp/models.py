from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.utils.text import slugify
from django.utils import timezone

from .choises import BlogChoices
# Create your models here.


class CustomUser(AbstractUser):
    bio = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_img', blank=True, null=True)
    profile_picture_url = models.URLField(blank=True, null=True)
    job_title = models.CharField(max_length=50, blank=True, null=True)
    
    facebook = models.URLField(blank=True, null=True)
    youtube = models.URLField(blank=True, null=True)
    instagram = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)
    
    def __str__(self) -> str:
        return self.username
    
class Blog(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255, null=True)
    content = models.TextField()
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='blogs')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_time = models.DateTimeField(null=True, blank=True)
    is_draft = models.BooleanField(default=True)
    category = models.CharField(max_length=255, choices=BlogChoices.choices, blank=True, null=True)
    featured_image = models.ImageField(upload_to='blog_img', blank=True, null=True)

    class Meta:
        ordering = ['-published_time']

    def __str__(self) -> str:
        return self.title
    
    def save(self, *args, **kwargs):
        base_url = slugify(self.title)
        slug = base_url
        num = 1
        while Blog.objects.filter(slug=slug).exists():
            slug = f"{base_url}-{num}"
            num += 1
        self.slug = slug
        
        if not self.is_draft and self.published_time is None:
            self.published_time = timezone.now()
        
        super().save(*args, **kwargs) 