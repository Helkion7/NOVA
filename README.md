# 🌌 NOVA - Networked Operations for Virtualized Architectures 🚀

Welcome to **NOVA**, a secure and modular RESTful API deployment project built for interstellar scalability. Designed as a mission-critical system architecture, NOVA leverages a tri-server infrastructure to deliver fast, secure, and reliable service communication across a distributed network.

## ✨ Project Overview

This project is a part of a system administration and deployment assignment where the goal is to:

- Build a simple REST API with CRUD functionality.
- Deploy it on a secured three-server environment.
- Document and structure the deployment with best practices.

---

## 🌠 Features

- **🚦 RESTful API Endpoints**

  - `GET /status` - Check system health
  - `GET /items` - Retrieve item list
  - `POST /items` - Add a new item
  - `DELETE /items/:id` - Delete item by ID

- **🛡️ Middleware**

  - Logs all route requests with timestamps to `/var/logs`.

- **💾 Database**

  - MongoDB instance hosted securely and accessible only by the API server.

- **🛰️ Server Topology**
  - 3 virtual machines:
    - **API Server** - Hosts the REST API (Port 80)
    - **Database Server** - Runs MongoDB
    - **Document Server** - Manages shared logs and documentation via NFS

---

## 🧰 Technologies

- **Node.js / Express**
- **MongoDB**
- **Nginx / Systemd / NFS**
- **Linux (Debian-based)**
- **GitHub** for version control and collaboration

---

## 🗺️ Architecture

```plaintext
+-------------+       +----------------+       +------------------+
| API Server  | <---> | Database Server| <---> | Document Server  |
| 10.12.X.201 |       | 10.12.X.202     |       | 10.12.X.203       |
+-------------+       +----------------+       +------------------+
```
# NOVA
