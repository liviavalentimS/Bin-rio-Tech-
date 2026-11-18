#!/bin/bash

echo "=================================================="
echo "    LOGS UNIFICADOS - BINÁRIO TECH"
echo "    (Ctrl+C para sair)"
echo "=================================================="

docker compose logs -f --tail=20
