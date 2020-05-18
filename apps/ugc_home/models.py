from django.db import models
from db.base_model import BaseModel


# Create your models here.


class UgcUser(BaseModel):
    """ugc用户表"""
    objects = models.Manager()
    nickname = models.CharField(max_length=20, unique=True, verbose_name='昵称'),
    password = models.CharField(max_length=32, verbose_name='密码')
    identity = models.CharField(max_length=18, unique=True, verbose_name='身份证号')
    name = models.CharField(max_length=10, verbose_name='真实姓名')
    email = models.CharField(max_length=30, verbose_name='邮箱')
    phone = models.IntegerField(null=True, verbose_name='手机号')

    class Meta:
        unique_together = ['email', 'phone']
        db_table = 'ugc_user'
        verbose_name = 'ugc用户表'
        verbose_name_plural = verbose_name
