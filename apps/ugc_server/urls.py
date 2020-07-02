# -*- coding:utf-8 -*-
# @Time: 5/18/20 11:06 AM
# @Author:bayhax
from django.urls import path
from apps.ugc_server import views

urlpatterns = [
    path('ugc_server', views.UgcServerView.as_view()),  # 用户自建服务器首页
    path('create_server', views.CreateServerView.as_view()),  # 创建租赁服
]