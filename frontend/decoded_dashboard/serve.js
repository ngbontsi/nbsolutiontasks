const http = require('http');
const fs = require('fs');
const path = require('path');
const { createProxy } = require('http-proxy');

const DIST = path.join(__dirname, 'dist');
const PORT = 3000;

const proxy = createProxy({ target: 'http://localhost:8080', changeOrigin: true });

const MIME = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.json': 'application/json', '.woff2': 'font/woff2',
};

http.createServer((req, res) => {
  if (req.url.startsWith('/api/')) {
    return proxy.web(req, res);
  }
  let filePath = path.join(DIST, req.url === '/' ? 'index.html' : req.url);
  if (!fs.existsSync(filePath)) filePath = path.join(DIST, 'index.html');
  const ext = path.extname(filePath);
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
  fs.createReadStream(filePath).pipe(res);
}).listen(PORT, () => console.log(`Serving on http://localhost:${PORT}`));
