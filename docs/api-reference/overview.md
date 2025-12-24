---
sidebar_position: 1
---

# API Overview

Our REST API provides programmatic access to all platform features.

## Base URL

```
https://api.example.com/v1
```

## Response Format

All responses are returned in JSON format:

```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "error": null
}
```

## Error Handling

Error responses include details:

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Missing required parameter: email"
  }
}
```

## Rate Limiting

- **Free tier**: 100 requests/hour
- **Pro tier**: 1000 requests/hour
- **Enterprise**: Custom limits

Rate limit headers are included in every response:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Available Endpoints

Browse the endpoints in the sidebar to learn more about each API resource.
