#!/bin/sh

# Health check script for N8N
set -e

# Check if N8N is responding
HEALTH_CHECK_URL="http://localhost:5678/healthz"

# Use curl to check health endpoint
if curl -f -s --max-time 10 "$HEALTH_CHECK_URL" > /dev/null; then
    echo "N8N health check passed"
    exit 0
else
    echo "N8N health check failed"
    exit 1
fi