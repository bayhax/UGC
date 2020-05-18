# -*- coding:utf-8 -*-
# @Time: 5/18/20 10:45 AM
# @Author:bayhax
from django.urls import path
from apps.ugc_home import views
urlpatterns = [
    path('ugc_index', views.UgcIndexView.as_view()),  # ugc首页

]