import React, { Component } from 'react'
import Link from 'next/link'
import axios from 'axios'
import moment from 'moment'
import ReactSwipeEvents from 'react-swipe-events'
import Slider from 'rc-slider'
import Header from '../components/header'
import DayRank from '../components/day-rank'
import './ranking.scss'

const DATE = {
  YEAR: [
    '2015', '2016', '2017', '2018',
  ],
  MONTH: [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
  ]
}

const getDate = date => ({
  year: date.slice(0, 4),
  month: date.slice(4, 6),
  day: date.slice(6, 8),
})

const getTextFromDate = text => `${text.year}년 ${text.month}월 ${text.day}일`

class Ranking extends React.Component {

  state = {
    value: 1,
    year: moment().format('YYYY'),
    month: moment().format('MM'),
    day: moment().format('DD'),
    max: 365,
    data: [],
    load: true
  }

  static async getInitialProps({ query }) {
    query = query || {}
    query.lang = query.lang || 'ko-KR'
    query.adult = query.adult || 'kid'
    query.date = query.date || '20170630'
    const response = await axios.get(`https://top20-dot-lezhincomix-novel.appspot.com/v2/top20/${query.lang}/${query.adult}`);
    return {
      ...query,
      data: response.data,
      query
    }
  }

  onSliderChange = (value) => {
    const date = this.getByYearKeys(this.state.year)[value]
    const data = this.rankData[date]
    this.setState({
      value,
      data,
      ...getDate(date)
    });
  }

  onAfterChange = (value) => {
    /* console.log(this.rankDatakeys[value]);
    this.setState({
        value,
    }); */
    // this.rankingDay(this.rankDatakeys[value])
  }

  getByMonthKeys = (year, month) => {
    const regexp = new RegExp(`^(${year}${month})`)
    return this.rankDatakeys.filter(day => regexp.test(day))
  }

  getByYearKeys = year => {
    /* const regexp = new RegExp(`^(${year})+`)
    return this.rankDatakeys.filter(day => regexp.test(day)) */
    return this.rankDatakeys.sort()
  }

  componentWillMount() {
    const { data } = this.props
    const { rankData, comics } = data.data
    this.rankData = rankData;
    this.comics = comics;
    this.rankDatakeys = Object.keys(rankData);
    this.currentDate = `${this.props.date.slice(0, 4)}${this.props.date.slice(4, 6)}${this.props.date.slice(6, 8)}`
    this.setState({
      year: this.props.date.slice(0, 4),
      month: this.props.date.slice(4, 6),
      day: this.props.date.slice(6, 8),
      value: this.getByYearKeys(this.currentDate.slice(0, 4)).findIndex(key => key === this.currentDate),
      max: this.getByYearKeys(this.props.date.slice(0, 4)).length,
      data: this.rankData[this.currentDate] ? this.rankData[this.currentDate] : []
    })
  }

  componentDidMount() {
    const type = localStorage.getItem('__lz__ranking.type')
    const contents = document.querySelector('.contents').classList
    const toggleBtn = document.querySelector('.fas').classList
    if (type) {
      toggleBtn.remove('fa-th-list')
      toggleBtn.remove('fa-th-large')
      toggleBtn.add(`fa-th-${type === 'list' ? type : 'large'}`)
      contents.remove('type-list')
      contents.remove('type-grid')
      contents.add(`type-${type}`)
    } else {
      toggleBtn.add(`fa-th-large`)
      contents.add(`type-grid`)
      localStorage.setItem('__lz__ranking.type', 'grid')
    }
    this.setState({
      load: false
    })
  }

  handlePrevDay = () => {
    const value = this.state.value === 0 ? 0 : this.state.value - 1
    this.onSliderChange(value)
  }

  handleNextDay = () => {
    const value = this.state.value === this.state.max ? this.state.max : this.state.value + 1
    this.onSliderChange(value)
  }

  handleOnSwipedLeft = (e, originX, x) => {
    originX + 100 < x && this.handlePrevDay()
    
  }

  handleOnSwipedRight = (e, originX, x) => {
    originX - 100 > x && this.handleNextDay()
  }

  render() {

    return (
      <ReactSwipeEvents
        onSwipedLeft={this.handleOnSwipedRight}
        onSwipedRight={this.handleOnSwipedLeft}
      >
        <div>
          <Header query={this.props.query} />
          <div className="contents">
            <div className="current">
              <a className="current__prev" onClick={this.handlePrevDay}><i className="fas fa-chevron-left" /></a>
              <span className="current__date">{`${this.state.year}. ${this.state.month}. ${this.state.day}`}</span>
              <a className="current__next" onClick={this.handleNextDay}><i className="fas fa-chevron-right" /></a>
            </div>
            <div className="slider">
              <Slider
                value={this.state.value}
                min={0}
                max={this.state.max - 1}
                onChange={this.onSliderChange}
                // onAfterChange={this.onAfterChange}
                // tipFormatter={(v) => getTextFromDate(getDate(this.getByYearKeys(this.state.year)[v]))}
                dots={true}
              // marks={{'1': '1월', '100': '12월'}}
              />
            </div>
            <div className={`ranking load load-${this.state.load || 'false'}`} ref="rankingEl">
              <ul className="ranking__list">
                {<DayRank data={this.state.data} comics={this.comics} lang={this.props.lang} />}
              </ul>
            </div>
          </div>
        </div>
      </ReactSwipeEvents>
    );
  }
}

export default Ranking;

