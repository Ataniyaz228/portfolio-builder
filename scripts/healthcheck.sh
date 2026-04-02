#!/bin/bash
# ============================================
# healthcheck.sh — Проверка здоровья всех сервисов
# ============================================
# Использование: ./scripts/healthcheck.sh
#
# Проверяет:
# 1. Backend API — GET /api/health
# 2. Frontend — GET /
# 3. PostgreSQL — pg_isready
# ============================================

set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

BACKEND_URL="${BACKEND_URL:-http://localhost:3000}"
FRONTEND_URL="${FRONTEND_URL:-http://localhost:80}"

echo "🏥 Проверка здоровья сервисов..."
echo "=================================="

# --- Backend ---
echo -n "  Backend API (${BACKEND_URL}/api/health)... "
if curl -sf "${BACKEND_URL}/api/health" > /dev/null 2>&1; then
  echo -e "${GREEN}✅ OK${NC}"
else
  echo -e "${RED}❌ НЕДОСТУПЕН${NC}"
  FAILED=1
fi

# --- Frontend ---
echo -n "  Frontend (${FRONTEND_URL})... "
if curl -sf "${FRONTEND_URL}" > /dev/null 2>&1; then
  echo -e "${GREEN}✅ OK${NC}"
else
  echo -e "${RED}❌ НЕДОСТУПЕН${NC}"
  FAILED=1
fi

# --- PostgreSQL ---
echo -n "  PostgreSQL... "
if command -v pg_isready > /dev/null 2>&1; then
  if pg_isready -h "${DB_HOST:-localhost}" -p "${DB_PORT:-5432}" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ OK${NC}"
  else
    echo -e "${RED}❌ НЕДОСТУПЕН${NC}"
    FAILED=1
  fi
else
  # Проверяем через Docker, если pg_isready не установлен
  if docker exec portfolio-db pg_isready > /dev/null 2>&1; then
    echo -e "${GREEN}✅ OK${NC}"
  elif docker exec portfolio-db-prod pg_isready > /dev/null 2>&1; then
    echo -e "${GREEN}✅ OK${NC}"
  else
    echo -e "${YELLOW}⚠️  Не удалось проверить (pg_isready не найден)${NC}"
  fi
fi

echo "=================================="

if [ -n "$FAILED" ]; then
  echo -e "${RED}❌ Некоторые сервисы недоступны!${NC}"
  exit 1
else
  echo -e "${GREEN}✅ Все сервисы работают!${NC}"
  exit 0
fi
