# Generated by Django 3.0.6 on 2020-07-04 09:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('ugc_server', '0002_servermod_ugcserver'),
    ]

    operations = [
        migrations.AddField(
            model_name='ugcserver',
            name='ugc_user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]
