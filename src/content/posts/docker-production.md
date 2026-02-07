---
title: "Docker in Production: Lessons Learned"
date: "2025-11-20"
description: "Practical tips and hard-won lessons from running Docker containers in production environments."
tags: ["Docker", "DevOps", "Infrastructure"]
slug: "docker-production"
---

# Docker in Production: Lessons Learned

After years of running Docker containers in production across various projects, I've accumulated a set of practices that have saved me from countless headaches. Here are the most important ones.

## Use Multi-Stage Builds

Multi-stage builds dramatically reduce your final image size:

```dockerfile
# Build stage
FROM python:3.12-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# Production stage
FROM python:3.12-slim
WORKDIR /app
COPY --from=builder /install /usr/local
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
```

This approach keeps your production image clean — no build tools, no cache files, just what you need to run.

## Health Checks Matter

Always define health checks in your Dockerfile or compose file:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1
```

Without health checks, your orchestrator has no way to know if your application is actually serving requests or just sitting there with an open port.

## Log to stdout

Never write logs to files inside containers. Write to stdout/stderr and let your logging infrastructure (ELK, Loki, CloudWatch) handle collection:

```python
import logging
import sys

logging.basicConfig(stream=sys.stdout, level=logging.INFO)
```

## Resource Limits Are Non-Negotiable

Always set memory and CPU limits. A single container without limits can take down an entire host:

```yaml
services:
  api:
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
```

## Conclusion

Docker in production is powerful but requires discipline. Multi-stage builds, health checks, proper logging, and resource limits are the foundation. Get these right, and you'll sleep much better at night.
