# Generated by Django 3.0.6 on 2020-07-08 05:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ugc_server', '0003_ugcserver_ugc_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='ugcserver',
            name='is_private',
            field=models.SmallIntegerField(default=0, verbose_name='是否私密'),
            preserve_default=False,
        ),
    ]
