from django.db import models

class BlogChoices(models.TextChoices):
    Technology = 'Technology', 'Technology'
    Economy = 'Economy', 'Economy'
    Business = 'Business', 'Business'
    Sports = 'Sports', 'Sports'
    LifeStyle = 'LifeStyle', 'LifeStyle'