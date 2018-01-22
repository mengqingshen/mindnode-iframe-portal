const https = require('https')
const http = require('http')
const url = require('url')
const queryString = require('querystring')

const PORT = 9000


const app = http.createServer((req, res) => {
  const parts = req.url.split('?')
  if (parts.length > 0) {
    const querysStr = parts.pop()
    const querys = queryString.parse(querysStr, '&', '=')
    if (querys.url) {
      const urlObj = url.parse(querys.url)
      const sreq = https.request({
        hostname: urlObj.hostname,
        path: urlObj.path,
        hash: urlObj.hash,
        method: 'get'
      }, (sres) => {
        sres.pipe(res)
        sres.on('end', () => { console.log('done') })
      })
      sreq.end()
    } else {
      const sreq = https.request({
        hostname: 'my.mindnode.com',
        path: req.url,
        method: req.method
      }, (sres) => {
        sres.pipe(res)
        sres.on('end', () => { console.log('done') })
      })
      sreq.end()
    }
  }
})

app.listen(PORT)
console.log(`server started on ${PORT}`)