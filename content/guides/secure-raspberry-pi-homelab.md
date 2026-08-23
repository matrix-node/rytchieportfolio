---
title: Setting Up a Secure Raspberry Pi Homelab
excerpt: A comprehensive guide to deploying a low-power, high-security home server environment using Docker, Wireguard, and Traefik.
date: "2023-10-24"
updated: "2024-05-14"
tags: [homelab, docker, security, raspberry-pi]
category: Infrastructure
badge: growing
---

Building a homelab is a rite of passage for many developers. A Raspberry Pi provides a low-power, highly capable foundation for learning networking, containerization, and system administration. This guide outlines a structured approach to provisioning a new Raspberry Pi securely, ensuring it's ready to host your personal services without exposing them to unnecessary risk.

> [!INFO]
> This guide assumes you have a Raspberry Pi 4 or 5 with Raspberry Pi OS Lite installed and SSH enabled.

## Prerequisites

Before diving into configuration, ensure you have the base environment established. We will use Docker and Docker Compose heavily to manage our services cleanly.

```yaml title="docker-compose.yml"
version: '3.8'

services:
  traefik:
    image: traefik:v2.10
    container_name: traefik
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./data/traefik.yml:/traefik.yml:ro
      - ./data/acme.json:/acme.json
```

## Initial Configuration

- **Change the default password:** Immediate execution of `passwd` is mandatory.
- **Update the system:** `sudo apt update && sudo apt upgrade -y`
- **Configure Key-Based Authentication:** Disable password authentication in `/etc/ssh/sshd_config`.
- **Setup UFW (Uncomplicated Firewall):** Deny all incoming by default, allow SSH, HTTP, and HTTPS.

| Service Port | Protocol | Purpose |
| ------------ | -------- | ------- |
| 22 (or custom) | TCP | SSH Access (Internal Network Only) |
| 80 | TCP | HTTP (Redirect to HTTPS via Traefik) |
| 443 | TCP | HTTPS (Secure Traffic) |

## Hardening the Surface

Once the basics are in place, treat the Pi like any production node: automated OS updates (`unattended-upgrades`), fail2ban for SSH, and read-only mounts wherever a container does not need write access. Back up `acme.json` and your Traefik config to a private git repository — restoring a homelab should be a `git clone` away.
