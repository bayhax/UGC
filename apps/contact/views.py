from django.shortcuts import render
from django.views.generic import View
# Create your views here.


class ContactView(View):
    """联系我们"""
    def get(self, request):
        return render(request, 'contact.html')

    def post(self, request):
        pass