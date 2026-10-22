#!/bin/bash
BASE="http://localhost:3000/api/v1"
KEY="binario-tech-secret-2026"
echo "=== AUDITORIA DE SEGURANCA - $(date) ==="
echo -e "\n[1] Health check publico (esperado 200)"
curl -s -w "\nHTTP %{http_code}\n" $BASE/health
echo -e "\n[2] Sem chave (esperado 401)"
curl -s -w "\nHTTP %{http_code}\n" $BASE/motoristas
echo -e "\n[3] Chave incorreta (esperado 401)"
curl -s -w "\nHTTP %{http_code}\n" -H "X-API-KEY: chave-errada" $BASE/motoristas
echo -e "\n[4] CNH invalida (esperado 400)"
curl -s -w "\nHTTP %{http_code}\n" -X POST $BASE/motoristas \
  -H "X-API-KEY: $KEY" -H "Content-Type: application/json" \
  -d '{"nome":"Joao","cnh":"123"}'
echo -e "\n[5] Rota inexistente (esperado 404)"
curl -s -w "\nHTTP %{http_code}\n" -H "X-API-KEY: $KEY" $BASE/inexistente
echo -e "\n[6] Cadastro de motorista valido (esperado 201)"
curl -s -w "\nHTTP %{http_code}\n" -X POST $BASE/motoristas \
  -H "X-API-KEY: $KEY" -H "Content-Type: application/json" \
  -d '{"nome":"Maria Silva","cnh":"12345678901"}'
echo -e "\n[7] Listagem de motoristas (esperado 200)"
curl -s -w "\nHTTP %{http_code}\n" -H "X-API-KEY: $KEY" $BASE/motoristas
echo -e "\n[8] Cadastro de manutencao (esperado 201)"
curl -s -w "\nHTTP %{http_code}\n" -X POST $BASE/manutencoes \
  -H "X-API-KEY: $KEY" -H "Content-Type: application/json" \
  -d '{"veiculo":"Onibus 12","descricao":"Troca de oleo"}'
echo -e "\n[9] Listagem de manutencoes (esperado 200)"
curl -s -w "\nHTTP %{http_code}\n" -H "X-API-KEY: $KEY" $BASE/manutencoes
echo -e "\n=== FIM DA AUDITORIA ==="
