# -*- coding:utf-8 -*-
# @Time: 5/18/20 11:06 AM
# @Author:bayhax
from django.urls import path
from apps.ugc_server import views

urlpatterns = [
    path('ugc_server', views.UgcServerView.as_view()),  # 用户自建服务器首页
    path('create_server', views.CreateServerView.as_view()),  # 创建租赁服
    path('purchase', views.ServerPurchaseView.as_view()),  # 购买租赁服
    path('score_purchase', views.ScoreServerPurchaseView.as_view()),  # 积分购买
    path('money_purchase', views.MoneyServerPurchaseView.as_view()),  # 人民币购买
    path('change_server_password', views.ChangeServerPasswordView.as_view()),  # 修改服务器密码
    path('renewal', views.RenewalView.as_view()),  # 服务器续费
]