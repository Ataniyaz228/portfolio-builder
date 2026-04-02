#!/bin/bash
# ============================================
# migrate.sh — Запуск SQL миграций
# ============================================
# Использование:
#   ./scripts/migrate.sh                    # Локально
#   docker exec portfolio-backend-prod sh -c "..."  # В контейнере
#
# Скрипт подключается к PostgreSQL и выполняет
# все .sql файлы из папки migrations по порядку.
# ============================================

set -e

# Цвета для вывода
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

MIGRATIONS_DIR="${MIGRATIONS_DIR:-./portfolio-backend/src/db/migrations}"

echo "🗄️  Запуск миграций из: ${MIGRATIONS_DIR}"

# Проверяем наличие переменных окружения
if [ -z "$DB_HOST" ] || [ -z "$DB_NAME" ] || [ -z "$DB_USER" ]; then
  echo -e "${RED}❌ Ошибка: не заданы переменные DB_HOST, DB_NAME, DB_USER${NC}"
  echo "   Убедитесь, что .env файл загружен или переменные заданы."
  exit 1
fi

# Проверяем наличие директории миграций
if [ ! -d "$MIGRATIONS_DIR" ]; then
  echo -e "${RED}❌ Директория миграций не найдена: ${MIGRATIONS_DIR}${NC}"
  exit 1
fi

# Выполняем все SQL файлы по порядку
for migration in "${MIGRATIONS_DIR}"/*.sql; do
  if [ -f "$migration" ]; then
    filename=$(basename "$migration")
    echo "  📝 Выполняю: ${filename}..."

    PGPASSWORD="$DB_PASSWORD" psql \
      -h "$DB_HOST" \
      -p "${DB_PORT:-5432}" \
      -U "$DB_USER" \
      -d "$DB_NAME" \
      -f "$migration" \
      --quiet \
      2>&1

    if [ $? -eq 0 ]; then
      echo -e "  ${GREEN}✅ ${filename} — OK${NC}"
    else
      echo -e "  ${RED}❌ ${filename} — ОШИБКА${NC}"
      exit 1
    fi
  fi
done

echo -e "\n${GREEN}✅ Все миграции выполнены успешно!${NC}"
