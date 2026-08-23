---
title: "Experiment: WireGuard as a failover path for the homelab"
excerpt: "Testing whether a WireGuard tunnel to a VPS can transparently take over when the home connection drops. Numbers look promising; DNS is the hard part."
date: "2024-09-02"
tags: [networking, wireguard, homelab]
draft: true
---

Draft notes — do not publish until the failover test under real outage conditions is done.

## Hypothesis

A WireGuard tunnel between the home cluster and a cheap VPS, with `keepalive` and policy routing, can keep selected services reachable during an ISP outage — without a second WAN.

```ini title="/etc/wireguard/wg0.conf"
[Interface]
PrivateKey = <redacted>
Address = 10.8.0.2/32
Table = 51820
PostUp = ip rule add from 10.8.0.2 table 51820

[Peer]
PublicKey = <vps-pubkey>
Endpoint = vps.rytchie.dev:51820
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 25
```

## Open Questions

- How fast does the VPS-side `Endpoint` rotation converge when the home IP changes?
- Does `conntrack` break long-lived gRPC streams during the switch?
- Who owns DNS during failover — the tunnel, or a hidden-primary setup?
