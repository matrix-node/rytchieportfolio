---
title: Docker Multi-stage Builds for Go Services
excerpt: "TIL how to drastically reduce Docker image sizes for compiled languages by using scratch as the final stage base."
date: "2023-10-18"
tags: [Docker, DevOps, Go]
---

TIL how to drastically reduce Docker image sizes for compiled languages by using `scratch` as the final stage base. The same service went from a 870MB image to 9.4MB — cold starts faster, pulls faster, and the attack surface shrinks to almost nothing.

```dockerfile title="Dockerfile"
FROM golang:1.22-alpine AS build
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /app ./cmd/server

FROM scratch
COPY --from=build /app /app
COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
EXPOSE 8080
ENTRYPOINT ["/app"]
```

The two details that matter:

- `CGO_ENABLED=0` produces a static binary that runs on `scratch`.
- Copying `ca-certificates.crt` — otherwise every HTTPS call inside the container fails mysteriously.

> [!TIP]
> `-ldflags="-s -w"` strips debug tables. Another ~30% off the binary for free.
