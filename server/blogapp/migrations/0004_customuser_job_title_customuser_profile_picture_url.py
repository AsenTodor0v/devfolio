# Generated by Django 5.1.4 on 2025-01-17 09:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogapp', '0003_alter_blog_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='job_title',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='customuser',
            name='profile_picture_url',
            field=models.URLField(blank=True, null=True),
        ),
    ]
