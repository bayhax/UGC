# -*- coding:utf-8 -*-
# @Time: 5/18/20 10:39 AM
# @Author:bayhax
from django.urls import path
from apps.contact import views
urlpatterns = [
    path('contact', views.ContactView.as_view()),  # 联系我们
]