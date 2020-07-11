# -*- coding:utf-8 -*-
# @Time: 7/11/20 5:41 PM
# @Author:bayhax


# 开启服务器
from celery import shared_task


@shared_task
def start_server():
    print('开启服务器')
