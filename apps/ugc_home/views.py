from django.shortcuts import render
from django.views.generic import View
# Create your views here.


class UgcIndexView(View):
    """ugc首页"""
    def get(self, request):
        return render(request, 'ugc_index.html')

    def post(self, request):
        pass