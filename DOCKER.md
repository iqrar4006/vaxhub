# Docker Setup Guide

This guide explains how to run the project using Docker and Docker Compose.

# Prerequisites

Before running the project, make sure you have installed:

- Docker Desktop
- Docker Compose

Verify installation:

```bash
docker --version
docker compose version
```
---

# Project Structure

```
vaxhub/
│
├── docker-compose.yml
├── django_server/
│   ├── Dockerfile
│   └── ...
│
└── react_client/
    ├── Dockerfile
    └── ...
```

# Development Workflow

1. Clone the repository.
2. Create the required `.env` file inside `django_server`.
3. Build the Docker images.

4. Start the project.

```bash
docker compose up -d
```
5. Open the applications.

Frontend

```
http://localhost:3000
```
Backend

```
http://localhost:8000
```
---

# Stop Development

```bash
docker compose down
```
or

```bash
docker compose down -v
```

# After changes in table

1. Create migrations.

```bash
docker compose exec backend python manage.py makemigrations
```
2. Stop
```bash
docker compose down
```
3. Start 
```bash
docker compose up -d
```