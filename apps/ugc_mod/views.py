import json

from django.core.paginator import PageNotAnInteger, Paginator, EmptyPage, InvalidPage
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views.generic import View


# Create your views here.

class AllModView(View):
    def get(self, request):
        return redirect('/home/index#ugc_mod')

    def post(self, request):
        # 所有MOD,在缓存中。
        mod_list = [1, 2]
        # 返回给页面
        return HttpResponse(json.dumps({'mod_list': mod_list}))


class UserObtainedView(View):
    """用户获得的MOD"""

    def get(self, request):
        return redirect('/home/index#ugc_mod')

    def post(self, request):

        user_id = request.POST['user_id']

        # 在缓存中获取该账户id的所有已经获得的mod
        mod_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12]

        # 返回给页面
        return HttpResponse(json.dumps({'mod_list': mod_list}))


class UgcCreateView(UserObtainedView):
    """用户创建的MOD"""

    def post(self, request):
        user_id = request.POST['user_id']
        # 在缓存中获取该账户id的所有已经获得的mod
        mod_list = [1, 2, 2]
        # 返回给页面 django的分页系统
        return HttpResponse(json.dumps({'mod_list': mod_list}))
