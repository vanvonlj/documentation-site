---
sidebar_position: 9
---

# port-proxy

Expose local web applications publicly through the Distiller platform's built-in reverse proxy. Fix path issues, resolve MIME type errors, and make your applications accessible from anywhere.

## Overview

The port-proxy skill enables you to expose local web applications running on your Distiller device to the internet through a secure reverse proxy. It automatically handles SSL/TLS, domain routing, and path rewriting, making it easy to share your projects and access them remotely.

## Features

- **Public Access** - Expose local apps to the internet
- **Automatic SSL/TLS** - HTTPS enabled by default
- **Path Rewriting** - Fix absolute path issues
- **MIME Type Handling** - Resolve CSS/JS loading issues
- **WebSocket Support** - Real-time applications work
- **Custom Domains** - Use your own subdomain
- **Authentication** - Optional basic auth protection

## Prerequisites

- Distiller device with internet connection
- Local web application running on any port
- Valid Distiller account (for public proxies)
- Firewall configured if needed

## Usage

### Basic Commands

```bash
# Expose local app on port 3000
/port-proxy enable --port 3000

# Expose with custom subdomain
/port-proxy enable --port 5000 --subdomain myapp

# Expose with authentication
/port-proxy enable --port 8080 --auth user:password

# List active proxies
/port-proxy list

# Disable proxy
/port-proxy disable --port 3000

# Show proxy URL
/port-proxy url --port 3000
```

### Advanced Options

```bash
# Enable with path prefix
/port-proxy enable --port 3000 --path /myapp

# Enable WebSocket support
/port-proxy enable --port 3000 --websocket

# Custom timeout
/port-proxy enable --port 3000 --timeout 300

# Enable CORS
/port-proxy enable --port 3000 --cors

# Custom headers
/port-proxy enable --port 3000 --header "X-Custom: value"
```

## Common Use Cases

### Expose Development Server

```bash
# React/Vue/Angular dev server
npm start  # Runs on port 3000
/port-proxy enable --port 3000

# Access at: https://your-device.distiller.app
```

### Expose Flask/FastAPI App

```bash
# Start Flask app
python app.py  # Runs on port 5000

# Enable proxy
/port-proxy enable --port 5000 --subdomain myapi

# Access at: https://myapi.distiller.app
```

### Expose Node.js App

```bash
# Start Express server
node server.js  # Runs on port 8080

# Enable proxy with auth
/port-proxy enable --port 8080 --auth admin:secret123

# Access at: https://your-device.distiller.app
# Requires username: admin, password: secret123
```

## Python API

### Basic Proxy Management

```python
from distiller_sdk import PortProxy

# Create proxy manager
proxy = PortProxy()

# Enable proxy
url = proxy.enable(port=3000)
print(f"Application available at: {url}")

# Disable proxy
proxy.disable(port=3000)

# List all proxies
proxies = proxy.list()
for p in proxies:
    print(f"Port {p.port}: {p.url}")
```

### Advanced Configuration

```python
from distiller_sdk import PortProxy, ProxyConfig

# Configure proxy
config = ProxyConfig(
    port=5000,
    subdomain="myapp",
    path_prefix="/api",
    enable_websocket=True,
    enable_cors=True,
    timeout=300,
    auth=("username", "password")
)

proxy = PortProxy()
url = proxy.enable_with_config(config)
print(f"Proxy enabled: {url}")
```

### Automatic Proxy Management

```python
from distiller_sdk import PortProxy
import subprocess
import time

proxy = PortProxy()

# Start application
app_process = subprocess.Popen(["python", "app.py"])

# Wait for app to start
time.sleep(3)

# Enable proxy
url = proxy.enable(port=5000)
print(f"Application running at: {url}")

try:
    # Keep running
    app_process.wait()
except KeyboardInterrupt:
    # Cleanup
    proxy.disable(port=5000)
    app_process.terminate()
```

### Context Manager

```python
from distiller_sdk import PortProxy

# Automatically enable and disable proxy
with PortProxy() as proxy:
    url = proxy.enable(port=3000)
    print(f"App available at: {url}")

    # Run application
    run_app()

# Proxy automatically disabled when context exits
```

## Fixing Path Issues

### Problem: CSS/JS Not Loading

When running behind a reverse proxy, absolute paths may not work correctly.

**Symptom:**
```
GET /style.css → 404 Not Found
GET /script.js → 404 Not Found
```

**Solution 1: Use Relative Paths**

```javascript
// ❌ Absolute path (breaks behind proxy)
<link href="/style.css" rel="stylesheet">
<script src="/script.js"></script>

// ✅ Relative path (works behind proxy)
<link href="style.css" rel="stylesheet">
<script src="script.js"></script>
```

**Solution 2: Use Base Tag**

```html
<html>
<head>
    <base href="/">
    <link href="style.css" rel="stylesheet">
</head>
</html>
```

**Solution 3: Configure Path Prefix**

```bash
# Tell proxy to rewrite paths
/port-proxy enable --port 3000 --path /myapp --rewrite-paths
```

### Problem: API Endpoints 404

**Symptom:**
```
GET /api/users → 404 Not Found
```

**Solution: Path Prefix Configuration**

```python
# Flask example
from flask import Flask

app = Flask(__name__)

# Configure app for proxy path
app.config['APPLICATION_ROOT'] = '/myapp'

@app.route('/api/users')
def get_users():
    return {'users': []}

# Enable proxy with matching path
proxy.enable(port=5000, path_prefix='/myapp')
```

### Problem: WebSocket Connection Failed

**Symptom:**
```
WebSocket connection failed
```

**Solution: Enable WebSocket Support**

```bash
/port-proxy enable --port 3000 --websocket

# Or in Python
proxy.enable(port=3000, enable_websocket=True)
```

## MIME Type Issues

### Problem: Wrong MIME Type

**Symptom:**
```
Refused to apply style from 'style.css' because MIME type ('text/plain') is not 'text/css'
```

**Solution 1: File Extensions**

Ensure files have correct extensions:
- `.css` for stylesheets
- `.js` for JavaScript
- `.json` for JSON

**Solution 2: Server Configuration**

```python
# Flask example
from flask import Flask, send_from_directory

app = Flask(__name__)

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path,
                              mimetype='text/css' if path.endswith('.css') else None)
```

**Solution 3: Proxy Headers**

```bash
/port-proxy enable --port 3000 --header "Content-Type: text/css"
```

## Security

### Authentication

```bash
# Basic auth
/port-proxy enable --port 3000 --auth username:password

# In Python
proxy.enable(port=3000, auth=("username", "password"))
```

### IP Whitelist

```bash
# Only allow specific IPs
/port-proxy enable --port 3000 --allow-ip 192.168.1.0/24

# In Python
config = ProxyConfig(
    port=3000,
    allowed_ips=["192.168.1.0/24", "10.0.0.1"]
)
proxy.enable_with_config(config)
```

### Rate Limiting

```bash
# Limit requests per minute
/port-proxy enable --port 3000 --rate-limit 100

# In Python
proxy.enable(port=3000, rate_limit=100)
```

## Technical Details

### Proxy Architecture

```
Internet → Distiller Proxy (nginx) → Your Local App
  HTTPS        Path Rewriting           HTTP
  Port 443     SSL/TLS Termination       Port 3000
```

### Supported Protocols

- HTTP/1.1
- HTTP/2
- WebSocket (ws://, wss://)
- Server-Sent Events (SSE)

### Headers Added

The proxy adds headers to help your app:
- `X-Forwarded-For` - Original client IP
- `X-Forwarded-Proto` - Original protocol (https)
- `X-Forwarded-Host` - Original host
- `X-Real-IP` - Client IP address

### Limitations

- **Port Range**: 1024-65535 (no privileged ports)
- **Request Size**: 100MB max
- **Timeout**: 300 seconds default
- **Bandwidth**: Fair use policy applies
- **Concurrent Connections**: 100 per proxy

## Configuration Examples

### React Development Server

```bash
# Start React app
npm start  # Port 3000

# Enable proxy with WebSocket (for hot reload)
/port-proxy enable --port 3000 --websocket

# Access at generated URL
```

### FastAPI Backend

```python
from fastapi import FastAPI
from distiller_sdk import PortProxy
import uvicorn

app = FastAPI()
proxy = PortProxy()

@app.get("/api/hello")
def hello():
    return {"message": "Hello World"}

if __name__ == "__main__":
    # Enable proxy
    url = proxy.enable(port=8000, path_prefix="/api")
    print(f"API available at: {url}")

    # Start server
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

### Flask with Authentication

```python
from flask import Flask
from distiller_sdk import PortProxy

app = Flask(__name__)
proxy = PortProxy()

@app.route("/")
def index():
    return "Hello World"

if __name__ == "__main__":
    # Enable proxy with auth
    url = proxy.enable(
        port=5000,
        auth=("admin", "password123")
    )
    print(f"App available at: {url}")

    app.run(host="0.0.0.0", port=5000)
```

## Troubleshooting

### Proxy Won't Enable

```bash
# Check if port is already in use
netstat -tulpn | grep :3000

# Check if another proxy exists
/port-proxy list

# Verify application is running
curl http://localhost:3000
```

### 502 Bad Gateway

**Causes:**
- Application not running
- Application crashed
- Wrong port specified
- Firewall blocking connection

**Solutions:**
```bash
# Check if app is running
ps aux | grep python

# Check app logs
journalctl -u your-app

# Restart app
systemctl restart your-app

# Verify proxy port
/port-proxy list
```

### 504 Gateway Timeout

**Causes:**
- Application is slow
- Long-running request
- Database query taking too long

**Solutions:**
```bash
# Increase timeout
/port-proxy enable --port 3000 --timeout 600

# Or in Python
proxy.enable(port=3000, timeout=600)
```

### CSS/JS Not Loading

See "Fixing Path Issues" section above.

### WebSocket Not Working

```bash
# Enable WebSocket support
/port-proxy enable --port 3000 --websocket
```

## Best Practices

1. **Use authentication** - Protect sensitive applications
2. **Monitor traffic** - Check proxy logs regularly
3. **Set timeouts** - Prevent hung connections
4. **Use HTTPS** - Always (automatically enabled)
5. **Clean up** - Disable unused proxies
6. **Rate limiting** - Prevent abuse
7. **Test locally first** - Verify app works before proxying

## Advanced Examples

### Multi-Port Application

```python
from distiller_sdk import PortProxy

proxy = PortProxy()

# Frontend
frontend_url = proxy.enable(port=3000, subdomain="app")

# Backend API
api_url = proxy.enable(port=5000, subdomain="api")

# WebSocket server
ws_url = proxy.enable(port=8080, subdomain="ws", enable_websocket=True)

print(f"Frontend: {frontend_url}")
print(f"API: {api_url}")
print(f"WebSocket: {ws_url}")
```

### Auto-Restart with Proxy

```python
from distiller_sdk import PortProxy
import subprocess
import time

def run_app_with_proxy():
    proxy = PortProxy()

    while True:
        try:
            # Start app
            print("Starting application...")
            app = subprocess.Popen(["python", "app.py"])

            # Wait for startup
            time.sleep(3)

            # Enable proxy
            url = proxy.enable(port=5000)
            print(f"App running at: {url}")

            # Wait for app to exit
            app.wait()

        except KeyboardInterrupt:
            print("Shutting down...")
            proxy.disable(port=5000)
            app.terminate()
            break

        except Exception as e:
            print(f"Error: {e}")
            time.sleep(5)  # Wait before restart

run_app_with_proxy()
```

### Load Balanced Proxies

```python
from distiller_sdk import PortProxy

proxy = PortProxy()

# Start multiple instances
ports = [5000, 5001, 5002]

urls = []
for port in ports:
    url = proxy.enable(port=port)
    urls.append(url)
    print(f"Instance on port {port}: {url}")

# Configure load balancer to distribute across instances
```

## See Also

- [system-verification](./system-verification.md) - Verify network connectivity
- [distiller-troubleshooting](./distiller-troubleshooting.md) - Debug connection issues
- Nginx documentation for advanced proxy configuration
- Your application's documentation for proxy compatibility
