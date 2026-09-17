#!/bin/bash
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/v1/health)
echo "$(date '+%Y-%m-%d %H:%M:%S') - Health Check Status: $STATUS" > health_check.log
echo "Status HTTP: $STATUS"
