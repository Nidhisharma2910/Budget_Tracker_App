from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("tracker/",include("budget_tracker_app.urls")),
    path("user/",include("user.urls")),
]
