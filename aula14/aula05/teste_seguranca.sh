#!/bin/bash
BASE_URL="http://localhost:3000/api/v1/motoristas"
API_KEY_VALIDA="binario-tech-secret-2026"
LOG_FILE="audit_seguranca.log"

echo "===== Auditoria de Seguranca - $(date) =====" > "$LOG_FILE"

echo "" >> "$LOG_FILE"
echo "--- 3 tentativas SEM chave de API ---" >> "$LOG_FILE"
for i in 1 2 3; do
  STATUS=$(curl -s -o /tmp/resp.json -w "%{http_code}" "$BASE_URL")
  echo "Tentativa $i (sem x-api-key) -> HTTP $STATUS | $(cat /tmp/resp.json)" >> "$LOG_FILE"
done

echo "" >> "$LOG_FILE"
echo "--- 1 tentativa COM chave valida ---" >> "$LOG_FILE"
STATUS=$(curl -s -o /tmp/resp.json -w "%{http_code}" -H "x-api-key: $API_KEY_VALIDA" "$BASE_URL")
echo "Tentativa 4 (com chave valida) -> HTTP $STATUS | $(cat /tmp/resp.json)" >> "$LOG_FILE"

rm -f /tmp/resp.json
echo "Teste concluido. Log salvo em $LOG_FILE"
cat "$LOG_FILE"
