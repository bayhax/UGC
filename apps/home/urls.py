# -*- coding:utf-8 -*-
# @Time: 5/18/20 10:43 AM
# @Author:bayhax

from django.urls import path
from apps.home import views

urlpatterns = [
    path('index', views.IndexView.as_view()),  # 首页

]