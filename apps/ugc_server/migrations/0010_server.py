# Generated by Django 3.0.6 on 2020-07-18 09:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ugc_server', '0009_ugcserver_is_authenticate_password'),
    ]

    operations = [
        migrations.CreateModel(
            name='Server',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ip', models.CharField(max_length=40, verbose_name='服务器ip')),
                ('end_time', models.DateTimeField(verbose_name='到期时间')),
                ('disk', models.IntegerField(verbose_name='硬盘')),
                ('memory', models.IntegerField(verbose_name='内存')),
                ('bind_width', models.IntegerField(verbose_name='带宽')),
                ('cpu', models.IntegerField(verbose_name='cpu')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
