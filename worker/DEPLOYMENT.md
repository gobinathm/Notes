# Deployment Guide

## Quick Start

### 1. Deploy Worker

```bash
cd notes.gobinath.com/worker
npx wrangler deploy
```

### 2. Configure Environment

```bash
# Set production environment
npx wrangler secret put ENVIRONMENT
# When prompted, enter: production

# Verify API key is set
npx wrangler secret list
```

### 3. Test Deployment

```bash
# Update WORKER_URL in test-security.js
node test-security.js
```

## Environment Variables

| Variable | Type | Required | Description |
|----------|------|----------|-------------|
| `GEMINI_API_KEY` | Secret | Yes | Google Gemini API key |
| `ENVIRONMENT` | Secret | Yes | `production` or `development` |
| `SECURITY_LOGS` | KV Binding | No | KV namespace for security logs |

### Setting Secrets

```bash
# Set Gemini API key
npx wrangler secret put GEMINI_API_KEY

# Set environment
npx wrangler secret put ENVIRONMENT
```

### Listing Secrets

```bash
npx wrangler secret list
```

### Deleting Secrets

```bash
npx wrangler secret delete SECRET_NAME
```

## Configuration Files

### wrangler.toml

```toml
name = "notes-ai-api"
main = "src/index.js"
compatibility_date = "2024-01-01"

# Optional: KV namespace for security logging
# [[kv_namespaces]]
# binding = "SECURITY_LOGS"
# id = "your-kv-namespace-id"
```

## CORS Configuration

### Production Origins

Defined in `src/index.js`:
```javascript
const PROD_ORIGINS = [
  'https://notes.gobinath.com',
  'https://gobinathmallaiyan.github.io',
];
```

### Development Origins

Only active when `ENVIRONMENT=development`:
```javascript
const DEV_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:4173',
];
```

### Adding New Origins

1. Edit `PROD_ORIGINS` in `src/index.js`
2. Deploy worker
3. Test CORS from new origin

## Monitoring

### View Live Logs

```bash
npx wrangler tail
```

### Filter Security Events

```bash
npx wrangler tail --format pretty | grep SECURITY
```

### Check Worker Status

```bash
npx wrangler deployments list
```

## Rollback

### View Deployment History

```bash
npx wrangler deployments list
```

### Rollback to Previous Version

```bash
npx wrangler rollback [DEPLOYMENT_ID]
```

## Testing in Different Environments

### Local Development

```bash
# Set development environment
npx wrangler secret put ENVIRONMENT
# Enter: development

# Start local dev server
npx wrangler dev

# Test with localhost origins
curl -X POST http://localhost:8787 \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:5173" \
  -d '{"mode":"qa","question":"test","pageContent":"test"}'
```

### Staging

```bash
# Deploy to staging worker (if configured)
npx wrangler deploy --env staging

# Test staging endpoint
curl -X POST https://notes-ai-api-staging.workers.dev \
  -H "Content-Type: application/json" \
  -H "Origin: https://notes.gobinath.com" \
  -d '{"mode":"qa","question":"test","pageContent":"test"}'
```

### Production

```bash
# Ensure environment is set to production
npx wrangler secret put ENVIRONMENT
# Enter: production

# Deploy
npx wrangler deploy

# Run security tests
node test-security.js
```

## Troubleshooting

### "Forbidden" Error (403)

**Cause:** Origin not in allowlist or environment misconfigured

**Fix:**
1. Check origin in request matches `PROD_ORIGINS`
2. Verify `ENVIRONMENT` secret is set correctly
3. Check `wrangler tail` for CORS rejection logs

### "Rate limit exceeded" (429)

**Cause:** Too many requests from same IP

**Fix:**
1. Normal behavior - wait 1 minute or 24 hours depending on limit
2. If testing, use different IPs or adjust limits in code
3. Consider upgrading to KV-based rate limiting

### "Your question contains suspicious patterns" (400)

**Cause:** Prompt injection detected

**Fix:**
1. Rephrase question to avoid trigger words
2. Check `detectPromptInjection()` patterns if false positive
3. Review logs to see which pattern triggered

### Worker Not Responding

**Check:**
```bash
# View recent deployments
npx wrangler deployments list

# Check worker logs
npx wrangler tail

# Verify secrets
npx wrangler secret list
```

### API Key Issues

```bash
# Re-set API key
npx wrangler secret put GEMINI_API_KEY

# Test API key manually
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=YOUR_KEY" \
  -H 'Content-Type: application/json' \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
```

## Performance Optimization

### Reduce Cold Start Time

1. Keep worker warm with periodic requests
2. Minimize dependencies (already optimized)
3. Use Worker Analytics to monitor cold start frequency

### Optimize Response Time

1. Enable Cloudflare caching for static responses (not applicable for AI)
2. Monitor Gemini API latency
3. Consider using faster Gemini model if needed

### Scale for High Traffic

1. Upgrade rate limits
2. Migrate to KV-based rate limiting
3. Enable Cloudflare DDoS protection
4. Consider request queueing for burst traffic

## Security Hardening

### Enable KV Logging

```bash
# Create KV namespace
npx wrangler kv:namespace create "SECURITY_LOGS"

# Add to wrangler.toml
[[kv_namespaces]]
binding = "SECURITY_LOGS"
id = "your-kv-namespace-id"

# Deploy
npx wrangler deploy
```

### Review Security Logs

```bash
# List all security logs
npx wrangler kv:key list --namespace-id=your-kv-id

# Get specific log
npx wrangler kv:key get "log:timestamp:ip" --namespace-id=your-kv-id
```

### Block Specific IPs

Add to worker code:
```javascript
const BLOCKED_IPS = ['1.2.3.4', '5.6.7.8'];

if (BLOCKED_IPS.includes(clientIP)) {
  return jsonResponse({ error: 'Access denied' }, 403, allowedOrigin);
}
```

## Maintenance Schedule

### Weekly
- [ ] Review Cloudflare logs for anomalies
- [ ] Check rate limit effectiveness
- [ ] Monitor error rates

### Monthly
- [ ] Run full security test suite
- [ ] Review and update detection patterns
- [ ] Check for Gemini API updates
- [ ] Review KV storage usage (if enabled)

### Quarterly
- [ ] Full security audit
- [ ] Performance optimization review
- [ ] Update dependencies
- [ ] Review and update documentation

## Emergency Procedures

### Disable Worker Immediately

```bash
# Option 1: Rollback to previous version
npx wrangler rollback [SAFE_DEPLOYMENT_ID]

# Option 2: Deploy minimal passthrough
# (Edit src/index.js to return error for all requests)
npx wrangler deploy
```

### Block All Traffic

Add to start of fetch handler:
```javascript
return jsonResponse({ error: 'Service temporarily unavailable' }, 503, allowedOrigin);
```

### Rate Limit Emergency

Temporarily reduce limits:
```javascript
const RATE_LIMIT_PER_MIN = 1;
const RATE_LIMIT_PER_DAY = 10;
```

## Support

### Cloudflare Workers Issues
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare Community](https://community.cloudflare.com/)

### Gemini API Issues
- [Gemini API Docs](https://ai.google.dev/gemini-api/docs)
- [Google AI Studio](https://aistudio.google.com/)

### Security Issues
- Review `SECURITY.md`
- Check OWASP Top 10 for LLMs
- Monitor Cloudflare security alerts

---

**Last Updated:** 2026-02-23
