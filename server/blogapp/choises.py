from django.db import models

class BlogChoices(models.TextChoices):
    Frontend = 'Frontend', 'Frontend'
    Backend = 'Backend', 'Backend' 
    Fullstack = 'Fullstack', 'Fullstack'
    Web3 = 'Web3', 'Web3'
    Design = 'Design', 'Design'