# Generated by Django 3.0.6 on 2020-06-05 09:01

from django.db import migrations, models
import django.utils.timezone
import ugc_home.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
        ('ugc_home', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UgcUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('identity', models.CharField(max_length=18, unique=True, verbose_name='身份证号')),
                ('name', models.CharField(max_length=10, verbose_name='真实姓名')),
                ('phone', models.IntegerField(null=True, unique=True, verbose_name='手机号')),
                ('username', models.CharField(max_length=150, verbose_name='昵称')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'ugc用户表',
                'verbose_name_plural': 'ugc用户表',
                'db_table': 'ugc_user',
                'unique_together': {('email', 'phone')},
            },
            managers=[
                ('objects', ugc_home.models.UgcUserManager()),
            ],
        ),
    ]
