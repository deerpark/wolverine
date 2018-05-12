const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    server.get('/b', (req, res) => {
      return app.render(req, res, '/b', req.query)
    })

    server.get('/demoFilmstripView', (req, res) => {
      return app.render(req, res, '/demoFilmstripView', req.query)
    })
    server.get('/demo', (req, res) => {
      return app.render(req, res, '/demo', req.query)
    })

    server.get('/demo/breadcrumbs', (req, res) => {
      return app.render(req, res, '/demo/breadcrumbs', req.query)
    })
    server.get('/demo/droplist', (req, res) => {
      return app.render(req, res, '/demo/droplist', req.query)
    })
    server.get('/demo/dynamictable', (req, res) => {
      return app.render(req, res, '/demo/dynamictable', req.query)
    })
    server.get('/demo/emptystate', (req, res) => {
      return app.render(req, res, '/demo/emptystate', req.query)
    })
    server.get('/demo/smartcard', (req, res) => {
      return app.render(req, res, '/demo/smartcard', req.query)
    })
    server.get('/demo/quicksearch', (req, res) => {
      return app.render(req, res, '/demo/quicksearch', req.query)
    })

    server.get('/ranking/:lang/:adult/:date', (req, res) => {
      return app.render(req, res, '/ranking', {
        lang: req.params.lang,
        adult: req.params.adult,
        date: req.params.date
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
