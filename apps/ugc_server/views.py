from datetime import datetime, timedelta
import json

import pytz
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views.generic import View
from django_redis import get_redis_connection

from ugc_server.models import UgcServer


@receiver(post_save, sender=UgcServer)
def update_server(sender, **kwargs):
    # 更新缓存
    server = kwargs['instance'].__dict__
    server_id = server['id']
    redis_conn = get_redis_connection('default')
    if redis_conn.exists('server:%d' % server_id):
        redis_conn.delete('server:%d' % server_id)
    redis_conn.hmset('server:%d' % server_id,
                     {'server_name': server['server_name'], 'max_player': server['max_player'],
                      'status': server['status'], 'start_time': server['start_time'].strftime('%Y-%m-%d %H:%M'),
                      'end_time': server['end_time'].strftime('%Y-%m-%d %H:%M'), 'ugc_user_id': server['ugc_user_id']})


@receiver(post_delete, sender=UgcServer)
def delete_server(sender, **kwargs):
    # 删除缓存
    server = kwargs['instance'].__dict__
    server_id = server['id']
    redis_conn = get_redis_connection('default')
    if redis_conn.exists('server:%d' % server_id):
        redis_conn.delete('server:%d' % server_id)


class UgcServerView(View):
    """用户自建服页面"""

    def get(self, request):
        return render(request, 'ugc_server.html')

    def post(self, request):
        user_id = request.user.id
        server_id = []
        server_name = []
        server_max_player = []
        server_start_time = []
        server_end_time = []
        # 根据user_id查询该用户的所有租赁服信息， 缓存获取
        redis_conn = get_redis_connection('default')
        server_info = redis_conn.keys("server:*")
        # server_info = UgcServer.objects.filter(ugc_user_id=user_id)
        for server in server_info:
            server_data = redis_conn.hmget(server.decode('utf-8'), 'server_name', 'max_player',
                                           'start_time', 'end_time')
            server_data = [x.decode('utf-8') for x in server_data]

            server_id.append(server.decode('utf-8').split(':')[-1])
            server_name.append(server_data[0])
            server_max_player.append(server_data[1])
            server_start_time.append(server_data[2])
            server_end_time.append(server_data[3])

            # 数据库获取
            # server_id.append(server.id)
            # server_name.append(server.server_name)
            # server_max_player.append(server.max_player)
            # # 时区转换
            # start_time_temp = server.start_time.replace(tzinfo=pytz.UTC).astimezone(pytz.timezone('Asia/Shanghai'))
            # server_start_time.append(start_time_temp.strftime('%Y-%m-%d %H:%M'))
            # end_time_temp = server.end_time.replace(tzinfo=pytz.UTC).astimezone(pytz.timezone('Asia/Shanghai'))
            # server_end_time.append(end_time_temp.strftime('%Y-%m-%d %H:%M'))
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
