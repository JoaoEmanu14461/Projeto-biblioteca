from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Livro
from .serializers import LivroSerializer


@api_view(['GET', 'POST'])
def lista_livros(request):

    if request.method == 'GET':
        titulo = request.GET.get('titulo', '')

        livros = Livro.objects.all()

        if titulo:
            livros = livros.filter(titulo__icontains=titulo)

        serializer = LivroSerializer(livros, many=True)

        return Response(serializer.data)

    if request.method == 'POST':
        serializer = LivroSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['GET', 'DELETE'])
def detalhe_livro(request, id):

    try:
        livro = Livro.objects.get(id=id)
    except Livro.DoesNotExist:
        return Response(
            {'erro': 'Livro não encontrado.'},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'GET':
        serializer = LivroSerializer(livro)
        return Response(serializer.data)

    if request.method == 'DELETE':
        livro.delete()

        return Response(
            {'mensagem': 'Livro excluído com sucesso.'},
            status=status.HTTP_204_NO_CONTENT
        )
