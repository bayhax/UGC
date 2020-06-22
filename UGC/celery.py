# -*- coding:utf-8 -*-
# @Time: 6/5/20 11:49 AM
# @Author:bayhax
# absolute_import 不会与库冲突，python
from __future__ import absolute_import, unicode_literals
import os
from celery import Celery, platforms

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'UGC.settings')

# redis作队列中间件
# app = Celery('server_manage', backend='redis', broker='redis://localhost')
# rabbitmq作消息队列
# app = Celery('server_manage', broker='amqp://guest:guest@localhost')
app = Celery('UGC')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

# 允许root用户运行celery
platforms.C_FORCE_ROOT = True

# 防止内存泄漏
CELERYD_MAX_TASKS_PER_CHILD = 10


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))  # dumps its own request information

