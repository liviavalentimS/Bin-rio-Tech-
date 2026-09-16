#!/bin/bash
echo "Auditoria de processos Node.js - $(date)" > processos.log
echo "----------------------------------------" >> processos.log
ps aux | grep node >> processos.log
echo "----------------------------------------" >> processos.log
echo "Auditoria concluida." >> processos.log
