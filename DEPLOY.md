# 🚀 Деплой Portfolio — Руководство

## ⚡ Быстрый деплой: Railway + Vercel (Рекомендуется)

### Шаг 1: Закоммить изменения
```bash
cd "c:\Users\BINOM\Desktop\project adsum"
git add .
git commit -m "feat: prepare for Railway + Vercel deployment"
git push origin main
```

### Шаг 2: Деплой Backend на Railway
1. Перейди на [railway.app](https://railway.app) → Login через GitHub
2. **New Project** → **Deploy from GitHub repo** → `portfolio-builder`
3. Выбери сервис → Settings → **Root Directory**: `adsum-api`
4. Добавь PostgreSQL: **New** → **Database** → **Add PostgreSQL**
5. В **Variables** добавь:
   ```
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   JWT_SECRET=your-super-secret-key-min-32-chars
   FRONTEND_URL=https://your-vercel-app.vercel.app  ← пока оставь так, потом обновишь
   NODE_ENV=production
   ```
6. Railway автоматически задеплоит backend
7. Скопируй URL бэкенда (например: `https://adsum-api.up.railway.app`)

### Шаг 3: Деплой Frontend на Vercel
1. Перейди на [vercel.com](https://vercel.com) → Login через GitHub
2. **Add New Project** → **Import Git Repository** → `portfolio-builder`
3. В настройках:
   - **Root Directory**: `adsum-web`
   - **Framework**: Next.js
4. В **Environment Variables** добавь:
   ```
   NEXT_PUBLIC_API_URL=https://your-railway-url.up.railway.app/api
   ```
   (замени на свой URL с Railway)
5. Нажми **Deploy**

### Шаг 4: Обнови FRONTEND_URL в Railway
После получения URL от Vercel, вернись в Railway → Variables и обнови:
```
FRONTEND_URL=https://your-vercel-app.vercel.app
```

✅ **Готово!** Frontend: `https://your-app.vercel.app`

---

## 🏠 Локальная разработка

### Без Docker (разработка)
```bash
# Backend
cd portfolio-backend
cp .env.example .env    # Заполните .env
npm install
npm run dev             # http://localhost:3000

# Frontend (новый терминал)
cd portfolio-frontend
npm install
npm run dev             # http://localhost:5173
```

### С Docker (один контейнер для всего)
```bash
# Создайте .env из шаблона
cp .env.example .env
# Заполните DB_PASSWORD, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET

# Запуск всех сервисов
docker compose up --build

# Открыть:
# - Сайт:    http://localhost
# - API:     http://localhost:3000/api/health
# - pgAdmin: http://localhost:5050
```

### Остановка и очистка
```bash
docker compose down          # Остановить, сохранить данные
docker compose down -v       # Остановить и удалить данные БД
```

---

## Деплой на Production

### Вариант 1: Railway.app (рекомендуется для начала)

Railway — managed платформа с бесплатным PostgreSQL. Самый простой способ задеплоить.

**Шаги:**

1. Зарегистрируйтесь на [railway.app](https://railway.app) через GitHub.

2. **Создайте PostgreSQL сервис:**
   - New Project → Provision PostgreSQL
   - Скопируйте `DATABASE_URL` из Settings → Variables

3. **Деплой Backend:**
   - New → GitHub Repo → выберите `portfolio-backend`
   - Settings → Root Directory: `portfolio-backend`
   - Variables → добавьте все переменные из `.env.example`:
     ```
     PORT=3000
     NODE_ENV=production
     DB_HOST=<из Railway PostgreSQL>
     DB_PORT=<из Railway>
     DB_NAME=<из Railway>
     DB_USER=<из Railway>
     DB_PASSWORD=<из Railway>
     CORS_ORIGIN=https://your-frontend.up.railway.app
     JWT_ACCESS_SECRET=<openssl rand -hex 32>
     JWT_REFRESH_SECRET=<openssl rand -hex 32>
     ADMIN_EMAIL=admin@example.com
     ADMIN_PASSWORD_HASH=<bcrypt hash>
     ```
   - Deploy → автоматически

4. **Деплой Frontend:**
   - New → GitHub Repo → выберите `portfolio-frontend`
   - Settings → Root Directory: `portfolio-frontend`
   - Variables:
     ```
     VITE_API_URL=https://your-backend.up.railway.app/api
     ```
   - Build Command: `npm run build`
   - Start Command: `npx serve dist -s`

5. **Запустите миграции:**
   - Railway CLI: `railway run psql -f src/db/migrations/001_initial_schema.sql`

---

### Вариант 2: VPS (DigitalOcean / Hetzner)

Полный контроль. Подходит для production с доменом и SSL.

**Требования:** сервер с Ubuntu 22.04+, Docker, Docker Compose, домен.

**1. Подготовка сервера:**
```bash
# Подключаемся по SSH
ssh root@YOUR_SERVER_IP

# Устанавливаем Docker
curl -fsSL https://get.docker.com | sh
apt install docker-compose-plugin -y

# Создаём пользователя для деплоя
adduser deploy
usermod -aG docker deploy
su - deploy
```

**2. Клонируем и настраиваем проект:**
```bash
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio

# Создаём production .env
cp .env.example .env
nano .env
# Заполните ВСЕ переменные, особенно:
# - DB_PASSWORD: сложный пароль (openssl rand -hex 16)
# - JWT_ACCESS_SECRET: openssl rand -hex 32
# - JWT_REFRESH_SECRET: openssl rand -hex 32
# - CORS_ORIGIN: https://your-domain.com
```

**3. Запускаем production:**
```bash
docker compose -f docker-compose.prod.yml up -d --build

# Проверяем
./scripts/healthcheck.sh
```

**4. Настраиваем SSL (HTTPS) с Certbot:**
```bash
# Устанавливаем Certbot
apt install certbot -y

# Получаем сертификат
certbot certonly --standalone -d your-domain.com

# Добавьте SSL в Nginx конфиг (или используйте Traefik/Caddy)
```

**5. Настраиваем автоматический деплой (GitHub Actions):**
   - Settings → Secrets → добавьте:
     - `DEPLOY_HOST`: IP сервера
     - `DEPLOY_USER`: `deploy`
     - `DEPLOY_KEY`: SSH приватный ключ
     - `DEPLOY_PATH`: `/home/deploy/portfolio`
   - Теперь каждый push в main будет автоматически деплоиться!

---

## Откат (Rollback)

Если деплой сломал что-то:

```bash
# Вернуть предыдущую версию образов
docker compose -f docker-compose.prod.yml down
git checkout HEAD~1      # Откат на предыдущий коммит

docker compose -f docker-compose.prod.yml up -d --build

# Или откат по конкретному коммиту
git checkout <commit-hash>
docker compose -f docker-compose.prod.yml up -d --build
```

---

## Полезные команды

```bash
# Логи
docker compose logs -f backend     # Backend логи
docker compose logs -f frontend    # Frontend логи
docker compose logs -f postgres    # PostgreSQL логи

# Миграции
docker exec portfolio-backend-prod sh -c "..."

# Перезапуск одного сервиса
docker compose restart backend

# Статус контейнеров
docker compose ps

# Размер образов
docker images | grep portfolio
```
