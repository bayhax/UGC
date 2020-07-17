from django.db import models
from db.base_model import BaseModel
from ugc_mod.models import UgcMod
from ugc_home.models import UgcUser
# Create your models here.


class UgcServer(BaseModel):
    """UGC服务器表"""
    objects = models.Manager()
    server_name = models.CharField(max_length=6, verbose_name='服务器名称')
    server_password = models.CharField(max_length=128, null=True, verbose_name='服务器密码')
    max_player = models.SmallIntegerField(verbose_name='服务器最大人数')
    start_time = models.DateTimeField(verbose_name='起始时间')
    end_time = models.DateTimeField(verbose_name='结束时间')
    region = models.CharField(max_length=20, verbose_name='地区')
    status = models.SmallIntegerField(verbose_name='服务器状态')
    is_private = models.SmallIntegerField(verbose_name='是否私密')
    is_deadline = models.SmallIntegerField(verbose_name='是否到期')
    is_authenticate_password = models.SmallIntegerField(verbose_name='是否开启密码验证')
    ip = models.CharField(max_length=40, verbose_name='服务器ip')
    ugc_user = models.ForeignKey(UgcUser, blank=True, null=True, on_delete=models.SET_NULL)

    class Meta:
        db_table = 'ugc_server'
        verbose_name = 'ugc服务器表'
        verbose_name_plural = verbose_name


class ServerMod(BaseModel):
    """服务器/Mod对应表"""
    objects = models.Manager()
    server = models.ForeignKey(UgcServer, blank=True, null=True, on_delete=models.SET_NULL)
    mod = models.ForeignKey(UgcMod, blank=True, null=True, on_delete=models.SET_NULL)

    class Meta:
        unique_together = ['server', 'mod']
        index_together = ['server', 'mod']
        db_table = 'server_mod'
        verbose_name = '服务器/Mod对应表'
        verbose_name_plural = verbose_name
