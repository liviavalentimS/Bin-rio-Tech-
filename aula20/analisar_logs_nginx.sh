#!/bin/bash
echo "=== Últimas 15 linhas do access.log com status 200 ==="
sudo tail -n 15 /var/log/nginx/access.log | grep '" 200 '
