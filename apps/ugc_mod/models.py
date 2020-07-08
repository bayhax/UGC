from django.db import models
from db.base_model import BaseModel
from ugc_home.models import UgcUser
from tinymce.models import HTMLField


# Create your models here.
class UgcMod(BaseModel):
    """ugc_mod模型"""
    objects = models.Manager()
    title = models.CharField(max_length=20, unique=True, verbose_name='标题')
    main_pic = models.ImageField(upload_to='mod_pic', verbose_name='展示图片')
    status = models.SmallIntegerField(verbose_name='状态')
    content = HTMLField(verbose_name='mod内容')
    create = models.ForeignKey(UgcUser, blank=True, null=True, on_delete=models.SET_NULL, verbose_name='创建者id')

    class Meta:
        db_table = 'ugc_mod'
        verbose_name = '模型表'
        verbose_name_plural = verbose_name


class ModUser(BaseModel):
    """mod和其拥有着对应关系表"""
    objects = models.Manager()
    mod = models.ForeignKey(UgcMod, blank=True, null=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(UgcUser, blank=True, null=True, on_delete=models.SET_NULL)

    class Meta:
        unique_together = ['mod', 'user']
        index_together = ['mod', 'user']
        db_table = 'ugc_mod_user'
        verbose_name = 'mod/拥有着关系表'
        verbose_name_plural = verbose_name


class ModComment(BaseModel):
    """mod评论表"""
    objects = models.Manager()
    mod = models.ForeignKey(UgcMod, blank=True, null=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(UgcUser, blank=True, null=True, on_delete=models.SET_NULL)
    comment_content = models.CharField(max_length=100, verbose_name='评论内容')
    star = models.SmallIntegerField(default=0, verbose_name='评分')

    class Meta:
        db_table = 'ugc_mod_comment'
        verbose_name = 'mod评论表'
        verbose_name_plural = verbose_name
