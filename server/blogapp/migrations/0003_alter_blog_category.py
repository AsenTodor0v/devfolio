# Generated by Django 5.1.4 on 2025-01-17 09:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogapp', '0002_blog'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='category',
            field=models.CharField(blank=True, choices=[('Frontend', 'Frontend'), ('Backend', 'Backend'), ('Fullstack', 'Fullstack'), ('Web3', 'Web3'), ('Design', 'Design')], max_length=255, null=True),
        ),
    ]
