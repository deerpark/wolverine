import React, { PureComponent } from 'react'
import ReactGA from 'react-ga'

export default class GA extends PureComponent {

  GAInit = () => {
    ReactGA.initialize('UA-120227273-1')
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  render() {
    this.GAInit()
    return(
      <div></div>
    )
  }
}
