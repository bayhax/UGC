# Generated by Django 3.0.6 on 2020-07-18 09:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ugc_server', '0011_auto_20200718_1746'),
    ]

    operations = [
        migrations.AddField(
            model_name='server',
            name='rest_disk',
            field=models.IntegerField(default=50, verbose_name='空闲硬盘'),
            preserve_default=False,
        ),
    ]
