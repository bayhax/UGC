from datetime import datetime, timedelta
import json

import pytz
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views.generic import View

from ugc_server.models import UgcServer


class UgcServerView(View):
    """用户自建服页面"""

    def get(self, request):
        return redirect('/#ugc_server')

    def post(self, request):
        user_id = request.user.id
        server_id = []
        server_name = []
        server_max_player = []
        server_start_time = []
        server_end_time = []
        # 根据user_id查询该用户的所有租赁服信息， 缓存获取
        server_info = UgcServer.objects.filter(ugc_user_id=user_id)
        for server in server_info:
            server_id.append(server.id)
            server_name.append(server.server_name)
            server_max_player.append(server.max_player)
            # 时区转换
            start_time_temp = server.start_time.replace(tzinfo=pytz.UTC).astimezone(pytz.timezone('Asia/Shanghai'))
            server_start_time.append(start_time_temp.strftime('%Y-%m-%d %H:%M'))
            end_time_temp = server.end_time.replace(tzinfo=pytz.UTC).astimezone(pytz.timezone('Asia/Shanghai'))
            server_end_time.append(end_time_temp.strftime('%Y-%m-%d %H:%M'))
        # json串
        server_data = {'server_id': server_id, 'server_name': server_name, 'server_max_player': server_max_player,
                       'server_start_time': server_start_time, 'server_end_time': server_end_time}
        # 数据返回页面
        return HttpResponse(json.dumps(server_data))


class CreateServerView(View):
    """创建租赁服"""

    def get(self, request):
        return render(request, 'create_server.html')

    def post(self, request):
        pass


class ServerPurchaseView(View):
    """服务器租赁"""
    def get(self, request):
        pass

    def post(self, request):
        pass


class ScoreServerPurchaseView(ServerPurchaseView):
    """积分购买"""
    def get(self, request):
        score_purchase = request.GET['price']
        return render(request, 'score_purchase.html', {'score_purchase': score_purchase})

    def post(self, request):
        # 获取购买用户的ID，需要支付的积分
        user_id = request.user.id
        pay = request.POST['pay']
        server_name = request.POST['server_name']
        max_player = request.POST['max_player']
        start_time = request.POST['start_time']
        end_time = request.POST['end_time']
        rent_time = int(request.POST['rent_time'])
        ugc_user_id = request.user.id
        # 查看积分是否够用
        # 用户积分大于等于所需积分
        if 1000 >= int(pay):
            # 异步开启服务器，celery, 并将该租赁服务器所属信息入库
            ugc_server = UgcServer(server_name=server_name, max_player=max_player, status=0, start_time=datetime.now(),
                                   end_time=datetime.now() + timedelta(days=rent_time), ugc_user_id=ugc_user_id)
            ugc_server.save()
            print(server_name, max_player, start_time, end_time)

            tips = '购买成功，服务器将在十分钟内开启，请稍等'
        else:
            tips = '购买失败,积分不足'
        return HttpResponse(json.dumps({'tips': tips}))


class MoneyServerPurchaseView(ServerPurchaseView):
    """人民币玩家"""
    def get(self, request):
        money_purchase = request.GET['price']
        return render(request, 'money_purchase.html', {'money_purchase': money_purchase})

    def post(self, request):
        pass
