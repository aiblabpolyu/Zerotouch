import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 8080

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/dashscope', createProxyMiddleware({
  target: 'https://dashscope.aliyuncs.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/dashscope': '/compatible-mode/v1'
  },
  secure: true,
  logLevel: 'info',
  onProxyReq: (proxyReq, req, res) => {
    // Inject Authorization header from environment if not provided by client
    const existingAuth = proxyReq.getHeader('authorization')
    const envKey = process.env.DASHSCOPE_API_KEY
    if (!existingAuth && envKey) {
      proxyReq.setHeader('authorization', `Bearer ${envKey}`)
    }
    console.log(`[PROXY] ${req.method} ${req.originalUrl} -> ${proxyReq.getHeader('host')}${proxyReq.path}`)
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log(`[PROXY] Response: ${proxyRes.statusCode} for ${req.originalUrl}`)
  },
  onError: (err, req, res) => {
    console.error('[PROXY] Error:', err.message)
    res.status(500).json({ error: 'Proxy error', message: err.message })
  }
}))

app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' })
  }
  
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.use((err, req, res, next) => {
  console.error('[SERVER] Error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📁 Serving static files from: ${path.join(__dirname, 'dist')}`)
  console.log(`🔄 API proxy: /api/dashscope -> https://dashscope.aliyuncs.com/compatible-mode/v1`)
  console.log(`🏥 Health check: /health`)
})
