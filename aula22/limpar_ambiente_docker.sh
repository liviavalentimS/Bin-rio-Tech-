#!/bin/bash

echo "=================================================="
echo "    LIMPEZA DO AMBIENTE DOCKER - BINÁRIO TECH"
echo "=================================================="

echo "[1/3] Procurando containers inativos (created/exited)..."
INATIVOS=$(docker ps -aq --filter "status=exited" --filter "status=created")

if [ -n "$INATIVOS" ]; then
  echo "[2/3] Parando e removendo containers inativos..."
  docker stop $INATIVOS 2>/dev/null
  docker rm $INATIVOS
else
  echo "[2/3] Nenhum container inativo encontrado."
fi

echo "[3/3] Removendo imagens pendentes (dangling)..."
PENDENTES=$(docker images -q --filter "dangling=true")

if [ -n "$PENDENTES" ]; then
  docker rmi $PENDENTES
else
  echo "Nenhuma imagem pendente encontrada."
fi

echo "=================================================="
echo "Limpeza concluída."
echo "=================================================="
