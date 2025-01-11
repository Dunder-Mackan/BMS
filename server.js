const path = require('path')
const { createServer } = require('http')
const { parse } = require('url')
const next = require(path.join(process.cwd(), 'node_modules', 'next'))

const dev = process.env.NODE_ENV !== 'production'
const hostname = '192.168.1.90'
const port = process.env.PORT || 8080  // Ändrat från 80 till 8080
const app = next({ 
  dev, 
  hostname: '0.0.0.0',
  port,
  dir: process.cwd()
})
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
      
      const parsedUrl = parse(req.url, true)
      
      if (req.url.startsWith('/phpmyadmin') || req.url.endsWith('.php')) {
        res.writeHead(404)
        res.end('Not found')
        return
      }

      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('Internal Server Error')
    }
  }).listen(port, '0.0.0.0', (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
    console.log(`> Access locally via http://localhost:${port}`)
    console.log(`> Access on network via http://${hostname}:${port}`)
  })
})

