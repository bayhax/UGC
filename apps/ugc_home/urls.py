# -*- coding:utf-8 -*-
# @Time: 5/18/20 10:45 AM
# @Author:bayhax
from django.urls import path, re_path, include
from apps.ugc_home import views

from django.contrib.auth import views as auth_views

app_name = 'ugc_home'

urlpatterns = [
    re_path(r'^$', views.IndexView.as_view()),  # 首页
    path('login', views.LoginView.as_view(), name='login'),  # 登录页面
    # path('reset_password', views.ResetPasswordView.as_view(), name='reset_password'),  # 重置密码
    path('user_center', views.UserCenterView.as_view()),  # 用户中心页面
    path('change_password_confirm', views.ChangePasswordConfirmView.as_view()),  # 修改密码-确认身份
    path('change_password', views.ChangePassword.as_view()),  # 修改密码-输入新密码
    path('change_password_done', views.ChangePasswordDoneView.as_view(), name='change_password_done'),  # 修改密码--修改成功
    path('change_email_confirm', views.ChangeEmailConfirmView.as_view()),  # 修改邮箱-确认身份
    path('change_email', views.ChangeEmail.as_view()),  # 修改邮箱-输入新密码
    path('change_email_done', views.ChangeEmailDoneView.as_view(), name='change_email_done'),  # 修改邮箱--修改成功
    path('user_quit', views.user_quit, name='user_quit'),  # 退出
    path('register', views.RegisterView.as_view()),  # 注册页面
    re_path(r'^active/(?P<token>.*)$', views.ActiveView.as_view()),  # 邮箱验证
    path('mod', views.ModView.as_view()),  # MOD展示页
    # path('all_mod', views.all_mod_view),  # 所有mod
    path('supervisor', views.supervisor),  # 家长监护
    path('dispute', views.dispute),  # 纠纷处理
]