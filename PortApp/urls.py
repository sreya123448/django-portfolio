from django.urls import path
from . import views

urlpatterns = [
    path('', views.Home, name='Home'),
    path('contact/', views.contact_view, name='contact'),
]
