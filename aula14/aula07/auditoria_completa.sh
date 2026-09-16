#!/bin/bash

LOG_FILE="auditoria.log"
BASE_URL="http://localhost:3000/api/v1/telemetria"

echo "=== Auditoria iniciada em $(date) ===" > "$LOG_FILE"

echo "" >> "$LOG_FILE"
echo "--- Rota Scania ---" >> "$LOG_FILE"
curl -s "$BASE_URL/scania" >> "$LOG_FILE"

echo "" >> "$LOG_FILE"
echo "--- Rota Mercedes ---" >> "$LOG_FILE"
curl -s "$BASE_URL/mercedes" >> "$LOG_FILE"

echo "" >> "$LOG_FILE"
echo "=== Auditoria finalizada em $(date) ===" >> "$LOG_FILE"

echo "Auditoria concluída! Verifique o arquivo $LOG_FILE"
