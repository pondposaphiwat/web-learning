from django.urls import path
from . import views # import view functions

# django looks for urlpatterns, spelled this way
urlpatterns = [
    path('hello', views.say_hello) # path function takes (url, view function), storefront.urls routes this here
]