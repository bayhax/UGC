from django.contrib import admin
from ugc_server.models import UgcServer, ServerMod, Server
# Register your models here.
admin.site.register(UgcServer)
admin.site.register(ServerMod)
admin.site.register(Server)
