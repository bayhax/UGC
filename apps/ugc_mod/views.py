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


class UserCreatedView(UserObtainedView):
    """用户创建的MOD"""

    def post(self, request):
        user_id = request.POST['user_id']
        # 在缓存中获取该账户id的所有已经获得的mod
        mod_list = [1, 2, 2]
        # 返回给页面 django的分页系统
        return HttpResponse(json.dumps({'mod_list': mod_list}))


class CreateModView(View):
    """创建MOD"""
    def get(self, request):
        return render(request, 'ugc_mod_create.html')

    def post(self, request):

        # 接收数据
        mod_title = request.POST['mod_title']
        img_file = request.FILES.get('img_file')
        mod_content = request.POST['mod_content']

        # 存储主图片
        with open(img_file.name, 'wb') as f:
            for chunk in img_file.chunks():
                f.write(chunk)

        # print(mod_title, mod_content, img_file)
        # 将MOD标题和内容存入MOD模型数据库

        # 返回结果
        return HttpResponse(json.dumps({'result': '创建成功'}))
