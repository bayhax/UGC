# -*- coding:utf-8 -*-
# @Time: 5/18/20 10:49 AM
# @Author:bayhax
from django.urls import path
from apps.ugc_mod import views


urlpatterns = [
    path('ugc_mod', views.UgcModView.as_view()),  # 用户创建模型页

]