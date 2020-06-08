# -*- coding:utf-8 -*-
# @Time: 5/18/20 10:49 AM
# @Author:bayhax
from django.urls import path
from apps.ugc_mod import views

urlpatterns = [
    path('user_obtained', views.UserObtainedView.as_view()),  # 用户已经获得的MOD
    path('user_create', views.UgcCreateView.as_view()),  # 用户自己创建的MOD
]
