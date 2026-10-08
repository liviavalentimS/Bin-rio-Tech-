#!/bin/bash

echo "========================================"
echo " TESTE AUTOMATICO - SERVIDOR TELEMETRIA "
echo "========================================"

echo ""
echo "[1] Testando rota /status..."
echo "Horario: $(date)"
curl -s http://localhost:3000/status
echo ""

echo ""
echo "[2] Testando rota /scania/info..."
echo "Horario: $(date)"
curl -s http://localhost:3000/scania/info
echo ""

echo ""
echo "[3] Testando rota /vw/info..."
echo "Horario: $(date)"
curl -s http://localhost:3000/vw/info
echo ""

echo ""
echo "----------------------------------------"
echo "Teste finalizado com sucesso!"
