from datetime import datetime, timedelta
import json

import pytz
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views.generic import View
from django_redis import get_redis_connection

from ugc_home.models import UgcUser
from ugc_server.tasks import start_server
from ugc_server.models import UgcServer

from django.contrib.auth.hashers import make_password


@receiver(post_save, sender=UgcServer)
def update_server(sender, **kwargs):
    # 更新缓存
    server = kwargs['instance'].__dict__
    server_id = server['id']
    redis_conn = get_redis_connection('default')
    # 判断是否存在该服务器名称信息
    if redis_conn.exists('server:%d' % server_id):
        redis_conn.delete('server:%d' % server_id)
    # 将该服务器信息村起来
    redis_conn.hmset('server:%d' % server_id,
                     {'server_name': server['server_name'], 'max_player': server['max_player'],
                      'is_private': server['is_private'], 'status': server['status'],
                      'start_time': server['start_time'].strftime('%Y-%m-%d %H:%M'),
                      'end_time': server['end_time'].strftime('%Y-%m-%d %H:%M'), 'ugc_user_id': server['ugc_user_id']})
    # 给用户列表增加服务器id
    redis_conn.rpush('user:%d' % server['ugc_user_id'], "server:%d" % server_id)


@receiver(post_delete, sender=UgcServer)
def delete_server(sender, **kwargs):
    # 删除缓存
    server = kwargs['instance'].__dict__
    server_id = server['id']
    redis_conn = get_redis_connection('default')
    if redis_conn.exists('server:%d' % server_id):
        redis_conn.delete('server:%d' % server_id)
        # 删除该服务器所在用户列表的信息
        redis_conn.lrem('user:%d' % server['ugc_user_id'], 0, 'server:%d' % server_id)


class UgcServerView(View):
    """用户自建服页面"""

    def get(self, request):
        return render(request, 'ugc_server.html')

    def post(self, request):
        user_name = request.user.username
        server_id = []
        server_name = []
        server_max_player = []
        server_is_private = []
        server_status = []
        server_start_time = []
        server_end_time = []
        # 根据user_id查询该用户的所有租赁服信息， 缓存获取
        redis_conn = get_redis_connection('default')
        user_server_len = redis_conn.llen('user:%d' % request.user.id)
        server_info = redis_conn.lrange("user:%d" % request.user.id, 0, user_server_len)
        # server_info = UgcServer.objects.filter(ugc_user_id=user_id)
        for server in server_info:
            server_data = redis_conn.hmget(server.decode('utf-8'), 'server_name', 'max_player', 'is_private',
                                           'status', 'start_time', 'end_time')
            server_data = [x.decode('utf-8') for x in server_data]

            server_id.append(server.decode('utf-8').split(':')[-1])
            server_name.append(server_data[0])
            server_max_player.append(server_data[1])
            server_is_private.append(server_data[2])
            server_status.append(server_data[3])
            server_start_time.append(server_data[4])
            server_end_time.append(server_data[5])

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
        server_data = {'server_id': server_id, 'user_name': user_name, 'server_name': server_name,
                       'server_max_player': server_max_player, 'server_is_private': server_is_private,
                       'server_status': server_status, 'server_start_time': server_start_time,
                       'server_end_time': server_end_time}
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
        # user_id = request.user.id
        price = request.POST['price']
        server_name = request.POST['server_name']
        max_player = request.POST['max_player']
        start_time = request.POST['start_time']
        end_time = request.POST['end_time']
        rent_time = int(request.POST['rent_time'])
        is_private = request.POST['is_private']
        password = request.POST['password']
        ugc_user_id = request.user.id
        user_score = request.user.score
        # 查看积分是否够用
        # 用户积分大于等于所需积分
        if user_score >= int(price):
            # 异步开启服务器，celery, 并将该租赁服务器所属信息入库
            start_server.delay()
            ugc_server = UgcServer(server_name=server_name, max_player=max_player, is_private=is_private,
                                   server_password=make_password(password), status=0, start_time=datetime.now(),
                                   end_time=datetime.now() + timedelta(days=rent_time), ugc_user_id=ugc_user_id)
            ugc_server.save()
            
            # 积分变化
            UgcUser.objects.filter(id=ugc_user_id).update(score=user_score - int(price))
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


# 修改服务器密码
class ChangeServerPasswordView(View):
    def get(self, request):
        server_id = request.GET['server_id']
        return render(request, 'change_server_password.html', {'server_id': server_id})

    def post(self, request):
        server_id = request.POST['server_id'].split('_')[-1]
        new_password = request.POST['password']
        # 修改密码
        try:
            UgcServer.objects.filter(id=server_id).update(server_password=make_password(new_password))
            tips = '修改成功'
            return HttpResponse(json.dumps({'tips': tips}))
        except Exception as e:
            print(e)
            tips = '修改失败'
            return HttpResponse(json.dumps({'tips': tips}))


# 服务器续费
class RenewalView(View):
    def get(self, request):
        server_id = request.GET['server_id'].split('_')[-1]
        server = UgcServer.objects.get(id=server_id)
        end_time = server.end_time.strftime('%Y-%m-%d %H:%M')
        return render(request, 'renewal.html', {'server_id': server.id, 'server_name': server.server_name,
                                                'end_time': end_time, 'max_player': server.max_player})

    def post(self, request):
        try:
            get_end_time = request.POST['renewal_end_time']
            renewal_end_time = datetime.strptime(get_end_time, '%Y-%m-%d %H:%M')
            print(renewal_end_time)
            server_id = int(request.POST['server_id'])
            score = request.POST['score']
            user_score = request.user.score
            # 积分足够，更改到期日期并扣除相应积分
            if user_score >= int(score):
                UgcUser.objects.filter(id=request.user.id).update(score=user_score - int(score))
                UgcServer.objects.filter(id=server_id).update(end_time=renewal_end_time)
                # 更改缓存时间
                redis_conn = get_redis_connection('default')
                redis_conn.hset('server:%d' % server_id, 'end_time', get_end_time)
                tips = "续费成功"
            else:
                tips = "续费失败，可能积分不足"
            return HttpResponse(json.dumps({'tips': tips}))
        except Exception as e:
            print(e)
            return HttpResponse(json.dumps({'tips': '出现异常，请稍后再试'}))
