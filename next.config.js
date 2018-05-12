const withCSS = require('@zeit/next-css')
module.exports = withCSS({
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    config.externals = config.externals || {}
    config.externals.DD = 'DD'

    return config
  }
})
