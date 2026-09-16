#!/bin/bash

# ==========================================================
# teste_crud.sh
# Script de teste CRUD para a API de veículos
# Fluxo:
#   1. Cadastra 2 veículos (POST)
#   2. Atualiza 1 deles (PATCH)
#   3. Deleta o outro (DELETE)
# Todos os passos são registrados em crud_result.log
# ==========================================================

BASE_URL="http://localhost:3000/api/v1/veiculos"
LOG_FILE="crud_result.log"

# Zera o log a cada execução
echo "===== Execução iniciada em $(date '+%Y-%m-%d %H:%M:%S') =====" > "$LOG_FILE"

log() {
    echo -e "\n$1" | tee -a "$LOG_FILE"
}

log_response() {
    echo "$1" >> "$LOG_FILE"
}

# ----------------------------------------------------------
# PASSO 1: Cadastrar o primeiro veículo
# ----------------------------------------------------------
log "[PASSO 1] Cadastrando veículo 1 (Volvo FH 540)..."

RESPONSE_1=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{
        "montadora": "Volvo",
        "modelo": "FH 540",
        "placa": "KLL-9090",
        "tipo": "caminhao"
      }')

BODY_1=$(echo "$RESPONSE_1" | sed '$d')
STATUS_1=$(echo "$RESPONSE_1" | tail -n1 | cut -d: -f2)

log_response "Status: $STATUS_1"
log_response "Body: $BODY_1"

# Extrai o ID do veículo criado (assume campo "id" no JSON de retorno)
ID_1=$(echo "$BODY_1" | jq -r '.id // empty')

if [ -z "$ID_1" ]; then
    log "[ERRO] Não foi possível obter o ID do veículo 1. Abortando script."
    exit 1
fi

log "Veículo 1 cadastrado com sucesso. ID: $ID_1 (status $STATUS_1)"

# ----------------------------------------------------------
# PASSO 2: Cadastrar o segundo veículo
# ----------------------------------------------------------
log "[PASSO 2] Cadastrando veículo 2 (Scania R450)..."

RESPONSE_2=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{
        "montadora": "Scania",
        "modelo": "R450",
        "placa": "QWE-4321",
        "tipo": "caminhao"
      }')

BODY_2=$(echo "$RESPONSE_2" | sed '$d')
STATUS_2=$(echo "$RESPONSE_2" | tail -n1 | cut -d: -f2)

log_response "Status: $STATUS_2"
log_response "Body: $BODY_2"

ID_2=$(echo "$BODY_2" | jq -r '.id // empty')

if [ -z "$ID_2" ]; then
    log "[ERRO] Não foi possível obter o ID do veículo 2. Abortando script."
    exit 1
fi

log "Veículo 2 cadastrado com sucesso. ID: $ID_2 (status $STATUS_2)"

# ----------------------------------------------------------
# PASSO 3: Atualizar o veículo 1 (PATCH)
# ----------------------------------------------------------
log "[PASSO 3] Atualizando status do veículo ID $ID_1 para 'EM_ROTA'..."

RESPONSE_PATCH=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X PATCH "$BASE_URL/$ID_1/status" \
  -H "Content-Type: application/json" \
  -d '{ "status": "EM_ROTA" }')

BODY_PATCH=$(echo "$RESPONSE_PATCH" | sed '$d')
STATUS_PATCH=$(echo "$RESPONSE_PATCH" | tail -n1 | cut -d: -f2)

log_response "Status: $STATUS_PATCH"
log_response "Body: $BODY_PATCH"

log "Veículo ID $ID_1 atualizado (status HTTP $STATUS_PATCH)"

# ----------------------------------------------------------
# PASSO 4: Deletar o veículo 2 (DELETE)
# ----------------------------------------------------------
log "[PASSO 4] Deletando veículo ID $ID_2..."

RESPONSE_DELETE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X DELETE "$BASE_URL/$ID_2")

BODY_DELETE=$(echo "$RESPONSE_DELETE" | sed '$d')
STATUS_DELETE=$(echo "$RESPONSE_DELETE" | tail -n1 | cut -d: -f2)

log_response "Status: $STATUS_DELETE"
log_response "Body: $BODY_DELETE"

log "Veículo ID $ID_2 deletado (status HTTP $STATUS_DELETE)"

# ----------------------------------------------------------
# Resumo final
# ----------------------------------------------------------
log "\n===== RESUMO ====="
log "Veículo cadastrado e atualizado : ID $ID_1 (status PATCH: $STATUS_PATCH)"
log "Veículo cadastrado e deletado   : ID $ID_2 (status DELETE: $STATUS_DELETE)"
log "===== Execução finalizada em $(date '+%Y-%m-%d %H:%M:%S') ====="

echo -e "\nLog completo salvo em: $LOG_FILE"
