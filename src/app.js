const Koa = require('koa')
const proxyMiddleware = require('http-proxy-middleware')
const c2k = require('koa-connect')

const PORT = 9000
const app = new Koa()

app.use(c2k(proxyMiddleware(['**/*'], {
  target: 'https://my.mindnode.com',
  changeOrigin: true,
  logLevel: 'debug',
  onProxyRes: (proxyRes) => {
    delete proxyRes.headers['x-frame-options']
  }
})))

app.listen(PORT)
console.log(`server started on ${PORT}`)
