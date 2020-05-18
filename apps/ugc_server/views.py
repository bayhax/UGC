from django.shortcuts import render
from django.views.generic import View
# Create your views here.


class UgcServerView(View):
    """用户自建服"""
    def get(self, request):
        return render(request, 'ugc_server.html')

    def post(self, request):
        pass