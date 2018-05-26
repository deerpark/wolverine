import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import Ripple from '../components/ripple'
import '../scss/index.scss'

const Redirect = dynamic(import('../components/redirct'), {
  ssr: false,
  loading: () => <span className="loading"></span>
})

export default () => (<div className="load-true">
  <Ripple />
  <h1 className="header__logo index__logo"><span className="header__text"></span></h1>
  <Redirect />
</div>)
