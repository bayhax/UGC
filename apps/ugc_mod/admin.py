from django.contrib import admin
from ugc_mod.models import UgcMod, ModUser, ModComment
# Register your models here.
admin.site.register(UgcMod)
admin.site.register(ModUser)
admin.site.register(ModComment)