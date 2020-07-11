import json

from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.hashers import check_password, make_password
from django.db.models import Q
from django.http import HttpResponse
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer, SignatureExpired
from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.generic import View

from ugc_home.tasks import send_register_active_email

# Create your views here.
from ugc_home.models import UgcUser
import re


# 首页
from ugc_mod.models import UgcMod


class IndexView(View):
    def get(self, request):
        return render(request, 'index.html')

    def post(self,  request):
        pass


class RegisterView(View):
    """（类视图）注册"""

    def get(self, request):
        return render(request, 'register.html')

    def post(self, request):
        # 接收数据
        username = request.POST.get('username')
        password = request.POST.get('pwd')
        identity = request.POST.get('identity')
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        allow = request.POST.get('allow')

        # 进行数据校验
        if not all([username, password, identity, name, email, phone]):
            # 数据不完整
            return render(request, 'register.html', {'errmsg': '数据不完整'})
        # 校验邮箱
        if not re.match(r'^[a-z0-9][\w.\-]*@[a-z0-9\-]+(\.[a-z]{2,5}){1,2}$', email):
            return render(request, 'register.html', {'errmsg': '邮箱不正确'})

        if allow != 'on':
            return render(request, 'register.html', {'errmsg': '请同意协议'})

        # 校验用户名是否重复
        try:
            user = UgcUser.objects.get(username=username)
        except UgcUser.DoesNotExist:
            # 用户名不存在
            user = None

        if user:
            # 用户名已存在
            return render(request, 'register.html', {'errmsg': '用户已存在'})

        # 进行业务处理：进行用户注册
        user = UgcUser.objects.create_user(username=username, password=password, identity=identity, name=name,
                                           email=email, phone=phone)
        user.is_active = 0
        user.save()

        # 发送激活邮件，包含激活链接：http://127.0.0.1:8000/
        # 激活连接中需要包含用户的身份信息,并且把身份信息进行加密

        # 加密用户的身份信息，生成激活token
        serializer = Serializer(settings.SECRET_KEY, 3600)
        info = {'confirm': user.id}
        token = serializer.dumps(info)  # bytes
        token = token.decode()  # 解码 默认urf-8

        # 发邮件
        send_register_active_email.delay(email, username, token)

        # 返回应答,跳转到首页
        return redirect('/#ugc')


class ActiveView(View):
    """用户激活"""

    def get(self, request, token):
        """进行用户激活"""
        # 解密，获取要激活的用户信息
        serializer = Serializer(settings.SECRET_KEY, 3600)
        try:
            info = serializer.loads(token)
            # 获取待激活用户的id
            user_id = info['confirm']

            # 根据用户id获取用户信息
            user = UgcUser.objects.get(id=user_id)
            user.is_active = 1
            user.save()

            # 跳转到登录页面
            return redirect('/#ugc')

        except SignatureExpired as e:
            # 激活链接已过期
            return HttpResponse('激活链接已过期,请点击这里重新发送邮件进行验证。')


# 重写authenticate验证
class CustomBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = UgcUser.objects.get(Q(username=username) | Q(phone=username))
            if user.check_password(password):
                return user
        except Exception as e:
            return None


# 登录视图
class LoginView(View):

    def get(self, request):
        """显示登录页面"""
        # 判断是否记住了用户名
        if 'username' in request.COOKIES:
            username = request.COOKIES.get('username')
            checked = request.COOKIES.get('checked')
        else:
            username = ''
            checked = ''
        return render(request, 'login.html', {'username': username, 'checked': checked})

    def post(self, request):
        """登录校验"""
        # 接收数据
        username = request.POST.get('username')
        password = request.POST.get('pwd')
        # 校验数据
        if not all([username, password]):
            return render(request, 'login.html', {'errmsg': '账号或密码未填写'})
        # 业务处理：登录校验
        user = authenticate(username=username, password=password)
        if user is not None:
            # 用户名密码正确
            if user.is_active:
                # 用户已激活
                # 记录用户的登录状态
                login(request, user)

                # 跳转到ugc首页
                response = redirect('/#ugc_index')

                # 判断是否需要记住用户名
                remember = request.POST.get('remember')
                if remember == "on":
                    # 记住用户名
                    response.set_cookie('username', username, max_age=3600 * 7 * 24)
                else:
                    response.delete_cookie('username')

                # 返回response
                return response

            else:
                # 用户未激活
                return render(request, 'login.html', {'errmsg': '用户未激活'})
        else:
            # 用户名或密码错误
            return render(request, 'login.html', {'errmsg': '用户名或密码错误'})


# 个人中心
class UserCenterView(View):
    """修改邮箱/密码等操作"""
    def get(self, request):
        return render(request, "user_center.html")

    def post(self, request):
        pass


# 退出登录
def user_quit(request):
    logout(request)
    return redirect('/#ugc_index')


# 忘记密码重置
# class ResetPasswordView(View):
#     """重置密码"""
#
#     def get(self, request):
#         return render(request, 'login.html')
#
#     def post(self, request):
#         pass

# 修改密码--验证身份
class ChangePasswordConfirmView(View):
    def get(self, request):
        return render(request, 'change_password_confirm.html')

    def post(self, request):
        pass


# 修改密码 -- 输入新密码
class ChangePassword(View):
    def get(self, request):
        return render(request, 'change_password.html')

    def post(self, request):
        user_id = request.user.id
        user = UgcUser.objects.get(id=user_id)
        new_password = request.POST['new_password']
        try:
            # if check_password(new_password, user.password):
            user.password = make_password(new_password)
            user.save()
            tips = "success"
        except Exception as e:
            tips = "error"
        return HttpResponse(json.dumps({'tips': tips}))


# 修改密码 -- 修改成功
class ChangePasswordDoneView(View):
    def get(self, request):
        return render(request, 'change_password_done.html')

    def post(self, request):
        pass


# 修改邮箱--验证身份
class ChangeEmailConfirmView(View):
    def get(self, request):
        return render(request, 'change_email_confirm.html')

    def post(self, request):
        pass


# 修改邮箱 -- 输入新邮箱
class ChangeEmail(View):
    def get(self, request):
        return render(request, 'change_email.html')

    def post(self, request):
        user_id = request.user.id
        user = UgcUser.objects.get(id=user_id)
        new_email = request.POST['new_email']
        try:
            # if check_password(new_password, user.password):
            user.email = new_email
            user.save()
            tips = "success"
        except Exception as e:
            tips = "error"
        return HttpResponse(json.dumps({'tips': tips}))


# 修改密码 -- 修改成功
class ChangeEmailDoneView(View):
    def get(self, request):
        return render(request, 'change_email_done.html')

    def post(self, request):
        pass


# ugc_index页面mod展示
class ModView(View):
    def get(self, request):
        return redirect('/')

    def post(self, request):
        # 所有MOD,在缓存中。
        mod_dic = {}
        all_mod = UgcMod.objects.all()
        for mod in all_mod:
            mod_dic[mod.title] = str(mod.main_pic)

        # 返回给页面
        return HttpResponse(json.dumps(mod_dic))


def supervisor(request):
    return render(request, 'supervisor.html')


def dispute(request):
    return render(request, 'dispute.html')

