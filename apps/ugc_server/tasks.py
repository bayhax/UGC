# -*- coding:utf-8 -*-
# @Time: 7/11/20 5:41 PM
# @Author:bayhax


# 开启服务器
import multiprocessing
from datetime import datetime, timedelta

from celery import shared_task
from django_redis import get_redis_connection

from ugc_server.models import UgcServer
from ugc_server.models import Server


@shared_task
def start_server(server_name, max_player, region):
    """租赁服开服规则
        @params: server_name: 服务器名称
                 max_player: 租赁套餐中人数选择，服务器所能容纳的最大人数
                 region: 租赁服所在服务器的地区
                 end_time: 租赁服到期日期
        @rule: 1. 根据服务器空间计算，是否还能放下当前服务器。（计算硬盘大小）
                 10人/5G   20人/10G   40人/20G
    """
    need_disk = 5
    if int(max_player) == 20:
        need_disk = 10
    if int(max_player) == 40:
        need_disk = 20
    server = Server.objects.filter(rest_disk__gt=need_disk, region=region)

    # 如果有可以开通的服务器，则进行租赁服的部署, 没有则自动购买服务器并部署
    if server:
        ip = server[0].ip
    else:
        ip = ''
    return ip


@shared_task
def close_server():
    # 租赁服务器到期 自动关闭服务器
    # 查询end_time到期日期在当前时间一分钟内的服务器
    deadline_server = UgcServer.objects.filter(end_time__range=(datetime.now() + timedelta(minutes=-1),
                                                                datetime.now() + timedelta(seconds=30)))
    # 将快要到期的服务器的到期状态置为1，并且关闭服务器
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


@shared_task
def clear_server():
    # 服务器到期且一周之内没有续费，将清理租赁服空间
    pass
