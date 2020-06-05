# -*- coding:utf-8 -*-
# @Time: 5/18/20 10:45 AM
# @Author:bayhax
from django.urls import path
from apps.ugc_home import views
urlpatterns = [
    path('login', views.LoginView.as_view()),  # 登录页面
    path('register', views.RegisterView.as_view()),  # 注册页面
    path('active', views.ActiveView.as_view()),  # 邮箱验证
]