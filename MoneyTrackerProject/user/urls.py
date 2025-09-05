from django.urls import path

from .views import Register,Login,AuthUser

urlpatterns = [
    path("r1/", Register),
    path("l1/", Login),
    path("u1/", AuthUser),
]