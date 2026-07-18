# Docker Production Setup Guide

This guide explains how to run the application using the production Docker 

# Prerequisites

Install:

- Docker Desktop
- Docker Compose

Verify installation:

```bash
docker --version
docker compose version
```
---

setup.

---

# Production Architecture

```text
                    Browser
                        |
                        v
                  http://localhost
                        |
                        v
                 +-------------+
                 |    Nginx    |
                 +-------------+
                   |         |
                   |         |
                   v         v
             React Static Gunicorn
               Files         |
                             |
                             v
                            Django
                             |
                             |
                             v
                           SQLite
```

### Request Flow

1. Browser sends request to Nginx.
2. Nginx serves React static files.
3. Requests starting with `/api/` and `/doctorimg/` are forwarded to Django.
4. Gunicorn processes Django requests.
5. Response is returned to Nginx.
6. Nginx sends the response back to the browser.

---

# Containers

| Container | Purpose |
|------------|----------|
| nginx-prod | Reverse Proxy + React Static Files |
| django-prod | Django Application running on Gunicorn |

---

# Project Structure

```text
vaxhub/
│
├── Docker.prod.md
├── docker-compose.prod.yml
│
├── django_server/
│   ├── Dockerfile.prod
│   ├── manage.py
│   └── ...
│
├── react_client/
│   ├── src/
│   ├── public/
│   └── ...
│
└── nginx/
    ├── Dockerfile.prod
    ├── nginx.prod.conf
    └── ...
```

---
# Workflow

1. Clone the repository.
2. Create the required `.env` file inside `django_server`.
3. Build the Docker images.

4. Start the project.

# Build Production Images

Build all production images:

```bash
docker compose -f docker-compose.prod.yml build
```

Force a fresh build:

```bash
docker compose -f docker-compose.prod.yml build --no-cache
```

---

# Start Production Environment

```bash
docker compose -f docker-compose.prod.yml up -d
```

Verify containers are running:

```bash
docker ps
```

Expected output:

```text
django-prod
nginx-prod
```

---

# Access Application

Frontend:

```text
http://localhost
```

Example API Endpoint:

```text
http://localhost/api/user/login/
```

---

# Stop Production Environment

Stop containers:

```bash
docker compose -f docker-compose.prod.yml down
```

Stop containers and remove volumes:

```bash
docker compose -f docker-compose.prod.yml down -v
```

---

# Django Management Commands

Create migrations:

```bash
docker compose -f docker-compose.prod.yml exec backend python manage.py migrate
```

---

# Rebuild After Code Changes

Rebuild and restart:

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Full clean rebuild:

```bash
docker compose -f docker-compose.prod.yml down

docker compose -f docker-compose.prod.yml build --no-cache

docker compose -f docker-compose.prod.yml up -d
```
---

# Production Docker Files

### Backend

```text
django_server/Dockerfile.prod
```

Responsibilities:

- Install Python dependencies
- Run Django application
- Serve requests through Gunicorn

---

### Nginx

```text
nginx/Dockerfile.prod
```

Responsibilities:

- Build React application
- Copy React build files
- Serve static frontend files
- Reverse proxy API requests to Django

---

### Docker Compose

```text
docker-compose.prod.yml
```

Responsibilities:

- Start all production services
- Connect containers through Docker network
- Expose Nginx on port 80

---


# Notes

- React runs as static files inside Nginx.
- No React container exists in production.
- Gunicorn replaces Django's development server.
- Nginx acts as a reverse proxy and web server.
- Only Nginx is exposed to the outside world.
- Django is accessible only inside the Docker network.