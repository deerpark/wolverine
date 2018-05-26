import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import config from '../shared/config'
import util from '../shared/util'
import moment from 'moment'

const images = [
  '/static/flag-japan.svg',
  '/static/flag-south-korea.svg',
  '/static/flag-united-states.svg',
  '/static/logo-type-text-en.svg',
  '/static/logo-type-text-ja.svg',
  '/static/logo-type-text.svg',
  '/static/slider-handle.svg',
]

const preCacheImages = new Promise((resolve) => {
  const newCache = images.map(image => {
    const newImage = new Image(0, 0)
    newImage.src = image
    return newImage
  })
  newCache[newCache.length - 1].onload = () => resolve();
})

const date = moment().get('date') - 5 < 1 ? 1 : moment().get('date') - 5
const stringDate = `${moment().get('year')}${util.numToStringWithZero(moment().get('month') + 1)}${util.numToStringWithZero(date)}`

const query = localStorage.query ? JSON.parse(localStorage.query) : {
  locale: config.get('query').locale,
  ratings: config.get('query').ratings,
  date: stringDate
}

class Index extends React.Component {

  componentDidMount() {
    preCacheImages.then(() => {
      Router.push(`/ranking/${query.locale}/${query.ratings}/${stringDate}`)
    })
  }

  render() {
    return (<div className="redirect"></div>)
  }
}

export default Index;