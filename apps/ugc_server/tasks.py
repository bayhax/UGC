# -*- coding:utf-8 -*-
# @Time: 7/11/20 5:41 PM
# @Author:bayhax


# 开启服务器
import multiprocessing
from datetime import datetime, timedelta

from celery import shared_task
from django_redis import get_redis_connection

from ugc_server.models import UgcServer


@shared_task
def start_server(server_name, max_player, region):
    print(server_name, max_player, ip)
    ip = "127.0.0.1"
    return ip


@shared_task
def close_server():
    # 租赁服务器到期 自动关闭服务器
    # 查询end_time到期日期在当前时间一分钟内的服务器
    deadline_server = UgcServer.objects.filter(end_time__range=(datetime.now() + timedelta(minutes=-1),
                                                                datetime.now() + timedelta(seconds=30)))
    # 将快要到期的服务器的到期状态置为1，并且关闭服务器, 多进程
    # print(deadline_server)
    for server in deadline_server:
        print(server.id, server.ip)
        dead_server(server.id, server.ip)


def dead_server(server_id, server_ip):
    # 数据库字段设为到期,关闭,并更新缓存
    UgcServer.objects.filter(id=server_id).update(is_deadline=1, status=0)

    redis_conn = get_redis_connection('default')
    redis_conn.hmset("server:%d" % server_id, {"status": 0, "is_deadline": 1})
    # 根据ip地址关闭服务器
