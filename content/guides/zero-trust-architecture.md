---
title: Zero-Trust Architecture Basics
excerpt: Implementing identity-aware proxies and strict access controls for internal developer tools and dashboards.
date: "2023-09-12"
updated: "2023-11-20"
tags: [security, zero-trust, networking]
category: Security
badge: seedling
---

The old model — hard shell, soft interior — fails the moment an attacker gets any foothold inside the network. Zero-trust flips the assumption: no request is trusted by default, no matter where it comes from.

## Core Principles

1. **Identity is the perimeter.** Every request is authenticated and authorized, explicitly.
2. **Least privilege.** Services and people get the minimum access required, for the minimum time.
3. **Assume breach.** Design so that a compromised node cannot reach everything else.

## A Pragmatic Homelab Implementation

You do not need an enterprise platform to start. A Cloudflare Tunnel (or Tailscale Funnel) plus an identity provider gets you 80% of the value:

```yaml title="cloudflare-tunnel.yaml"
tunnel: homelab
credentials-file: /etc/cloudflared/creds.json
ingress:
  - hostname: grafana.rytchie.dev
    service: http://grafana:3000
    originRequest:
      idletimeout: 30s
  - hostname: argo.rytchie.dev
    service: http://argocd:80
  - service: http_status:404
```

Each hostname is locked behind Cloudflare Access policies — Google SSO, device posture checks, and per-app rules.

> [!TIP]
> Start with one internal dashboard behind an access policy. Once the workflow is familiar, migrating the rest is mechanical.

## What This Buys You

No open ports on your router, no VPN client to remember to enable, full audit logs of who touched what, and instant revocation when a device is lost.
