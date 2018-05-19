import React, { Component } from 'react'
import Link from 'next/link'
import axios from 'axios'
import moment from 'moment'
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
    data: []
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
    const regexp = new RegExp(`^(${year})+`)
    return this.rankDatakeys.filter(day => regexp.test(day))
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

  render() {

    return (
      <>
      <Header query={this.props.query} />
      <div className="contents">
        <div className="current">
          <Link
            href={{ pathname: `/ranking/${this.props.lang}/${this.props.adult}/${this.state.year - 1}0101` }}
          >
            <a className="current__prev"><i className="fas fa-chevron-left" /></a>
          </Link>
          <span className="current__date">{`${this.state.year}. ${this.state.month}. ${this.state.day}`}</span>
          <Link
            href={{ pathname: `/ranking/${this.props.lang}/${this.props.adult}/${+this.state.year + 1}0101` }}
          >
            <a className="current__next"><i className="fas fa-chevron-right" /></a>
          </Link>
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
        <div className="ranking" ref="rankingEl">
          <ul className="ranking__list">
            {<DayRank data={this.state.data} comics={this.comics} lang={this.props.lang} />}
          </ul>
        </div>
      </div>
      </>
    );
  }
}

export default Ranking;

