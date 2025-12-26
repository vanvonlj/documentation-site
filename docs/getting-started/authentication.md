---
sidebar_position: 2
---

# Authentication

All API requests require authentication using an API key.

## Getting Your API Key

1. Sign up for an account
2. Navigate to Settings → API Keys
3. Click "Generate New Key"
4. Copy and store your key securely

:::warning
Never commit API keys to version control or share them publicly!
:::

## Using Your API Key

### Node.js

```javascript
const apiKey = process.env.API_KEY;

const response = await fetch("https://api.example.com/endpoint", {
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
});
```

### Python

```python
import os

api_key = os.environ.get('API_KEY')

headers = {
    'Authorization': f'Bearer {api_key}',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.example.com/endpoint', headers=headers)
```

## Best Practices

- Store keys in environment variables
- Rotate keys regularly
- Use different keys for development and production
- Revoke compromised keys immediately
