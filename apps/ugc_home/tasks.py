# -*- coding:utf-8 -*-
# @Time: 6/5/20 11:50 AM
# @Author:bayhax
# 使用celery
from celery import Celery
from django.conf import settings
from django.core.mail import send_mail

# 在任务处理者一端加这几句，Django环境初始化
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "game_website.settings")
django.setup()

# 创建一个Celery 类的实例对象
app = Celery('celery_tasks.tasks', broker='redis://127.0.0.1:6379/2')


# 定义任务函数
@app.task
def send_register_active_email(to_email, username, token):
    """发送激活邮件"""
    # 组织邮件信息
    subject = '从零开始'
    message = ''
    sender = settings.EMAIL_FROM
    receiver = [to_email]
    html_message = """<h1>%s, 欢迎来到从零开始</h1>请在一小时内点击下面链接激活账户<br><a href="http://127.0.0.1:8000/ugc_home/active/%s"
    >http://127.0.0.1:8000/ugc_home/active/%s</a>""" % (username, token, token)
    send_mail(subject, message, sender, receiver, html_message=html_message)
