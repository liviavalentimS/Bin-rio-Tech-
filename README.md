# Aula 03 - Telemetria (API de caminhões)


Exercícios de requisições HTTP (curl, httpie, jq), rotas em Node.js e terminal Linux.


## Antes de começar
bash
cd curso-pbe1/binario_tech/aula03
npm install
npm start        # sobe a API em http://localhost:3021
Ferramentas necessárias: node, npm, curl, jq, httpie
(sudo apt-get install -y jq httpie).


## Rotas
| Rota | Descrição |
|---|---|
| /api/v1/scania | Dados da Scania |
| /api/v1/mercedes | Dados da Mercedes |
| /api/v1/vw | Dados da VW |
| /api/v1/volvo | Dados da Volvo (modelo FH 540) |


## Exercícios
1. curl -s http://localhost:3021/api/v1/scania | jq '.modelo'
2. http --body GET http://localhost:3021/api/v1/mercedes > mercedes.json
3. jq '.status' mercedes.json
4. Nova rota /api/v1/volvo no telemetria.js, reiniciar e testar
5. Script "start": "node telemetria.js" no package.json e npm start
6. ./testar_telemetria.sh > relatorio.log 2>&1
7. curl -s http://localhost:3021/api/v1/vw | jq '{montadora, status}'
8. ps aux | grep node e depois kill -9 <PID>


## O que mudar se precisar
**Porta:** troque 3021 no telemetria.js e nos comandos.
**Dados da Volvo:** edite montadora, modelo e status na rota.
**Nome do arquivo:** se não for telemetria.js, ajuste o script start.
