---
title: "Building a Home Kubernetes Cluster with Raspberry Pi 5"
excerpt: "A comprehensive 5-part guide on setting up k3s, configuring ingress, and deploying persistent storage for a self-hosted homelab environment."
date: "2024-02-10"
updated: "2024-08-02"
tags: [kubernetes, raspberry-pi, homelab, k3s]
category: Infrastructure
badge: growing
pinned: true
---

The Raspberry Pi 5 finally has the I/O and memory headroom to run a real cluster. This guide walks through the full setup I use: three control-plane-capable nodes, k3s with the embedded etcd datastore, Traefik ingress, and NFS-backed persistent volumes.

## Why k3s and Not k8s

k3s ships a certified Kubernetes distribution in a single binary, with sane defaults for ARM64. Everything you learn transfers directly to any managed Kubernetes you will touch professionally.

```bash title="install-k3s.sh"
# On the first node (control plane with embedded etcd)
curl -sfL https://get.k3s.io | sh -s - server \
  --cluster-init \
  --node-taint "CriticalAddonsOnly=true:NoExecute"

# Grab the join token for the other nodes
sudo cat /var/lib/rancher/k3s/server/token
```

```bash title="join-node.sh"
# On every additional node
curl -sfL https://get.k3s.io | sh -s - server \
  --server https://192.168.1.10:6443 \
  --token "$K3S_TOKEN"
```

## Bootstrapping the Cluster

1. Flash Raspberry Pi OS Lite (64-bit) and set static DHCP reservations for every node.
2. Boot from NVMe if your budget allows — SD cards die under etcd write load.
3. Install the first server with `--cluster-init`, then join the rest.
4. Copy `kubeconfig` to your workstation and verify with `kubectl get nodes`.

> [!WARNING]
> Do not run more than one etcd member on SD cards. etcd's write amplification will kill the cards within weeks — ask me how I know.

## Persistent Storage

For a homelab, an NFS provisioner on a NAS or a dedicated node is the pragmatic choice. The `local-path` provisioner bundled with k3s is fine for experiments, but it pins pods to nodes.

```yaml title="storage-class-nfs.yaml"
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: nfs-client
provisioner: cluster.local/nfs-subdir-external-provisioner
parameters:
  archiveOnDelete: "true"
```

## What Runs on It

Cert-manager for TLS, Traefik for ingress, ArgoCD for GitOps, and a monitoring stack with kube-prometheus-stack. Total idle draw: about 22W for three nodes.
