# -*- coding:utf-8 -*-
# @Time: 5/18/20 10:49 AM
# @Author:bayhax
from django.urls import path
from apps.ugc_mod import views

urlpatterns = [
    path('all_mod', views.AllModView.as_view()),  # 所有MOD
    path('user_obtained', views.UserObtainedView.as_view()),  # 用户已经获得的MOD
    path('user_create', views.UserCreatedView.as_view()),  # 用户自己创建的MOD
    path('create_mod', views.CreateModView.as_view()),  # 创建MOD
]
