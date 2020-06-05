from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from db.base_model import BaseModel
from django.contrib.auth.models import AbstractUser

# Create your models here.


class UgcUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, username, password, **extra_fields):
        if not username:
            raise ValueError("请填入用户名")
        if not password:
            raise ValueError("请填入密码")
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, password, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, password, **extra_fields)

    def create_superuser(self, username, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff=True")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True')

        return self._create_user(username, password, **extra_fields)


class UgcUser(AbstractUser):
    """ugc用户表"""
    identity = models.CharField(max_length=18, unique=True, verbose_name='身份证号')
    name = models.CharField(max_length=10, verbose_name='真实姓名')
    phone = models.CharField(max_length=11, verbose_name='手机号', unique=True)
    # 将phone/email/username作为username_filed，而不是原来的username字段，需要重写username
    username = models.CharField(max_length=150, verbose_name='用户名', unique=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['phone', 'email']
    # 重新定义Manager对象，在创建user的时候，使用phone,email,username和password
    objects = UgcUserManager()

    class Meta:
        unique_together = ['email', 'phone']
        db_table = 'ugc_user'
        verbose_name = 'ugc用户表'
        verbose_name_plural = verbose_name
