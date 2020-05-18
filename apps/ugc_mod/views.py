from django.shortcuts import render
from django.views.generic import View
# Create your views here.


class UgcModView(View):
    """用户模型页"""
    def get(self, request):
        return render(request, 'ugc_mod.html')

    def post(self, request):
        pass