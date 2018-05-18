const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    server.get('/ranking/:lang/:adult/:date', (req, res) => {
      return app.render(req, res, '/ranking', {
        lang: req.params.lang || 'ko-KR',
        adult: req.params.adult || 'kid',
        date: req.params.date || '20170630'
      })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
