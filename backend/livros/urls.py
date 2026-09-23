from django.urls import path
from . import views


urlpatterns = [
    path('livros/', views.lista_livros),
    path('livros/<int:id>/', views.detalhe_livro),
]