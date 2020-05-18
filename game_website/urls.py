"""game_website URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', include('home.urls')),  # 首页链接
    path('ugc_home/', include('ugc_home.urls')),  # ugc首页连接
    path('ugc_mod/',  include('ugc_mod.urls')),  # ugc模型链接
    path('ugc_server/', include('ugc_server.urls')),  # 用户自建服务器
    path('contact/', include('contact.urls')),  # 联系我们
]
