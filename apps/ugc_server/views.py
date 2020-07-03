from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import View


# Create your views here.


class UgcServerView(View):
    """用户自建服页面"""

    def get(self, request):
        return render(request, 'ugc_server.html')

    def post(self, request):
        pass


class CreateServerView(View):
    """创建租赁服"""

    def get(self, request):
        return render(request, 'create_server.html')

    def post(self, request):
        pass


class ServerPurchaseView(View):
    """服务器租赁"""
    def get(self, request):
        return render(request, 'purchase.html')

    def post(self, request):
        score_purchase = request.POST['price']
        # 调用支付接口
        return HttpResponse({'score_purchase': score_purchase})
