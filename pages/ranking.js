import React, { Component } from "react";
import Router from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
/* import ReactSwipeEvents from 'react-swipe-events' */
import Slider from "rc-slider";
import moment from "moment";
import axios from "axios";
import Button, { ButtonGroup } from "@atlaskit/button";
import Modal from "@atlaskit/modal-dialog";
import config from "../shared/config";
import util from "../shared/util";
import { DATE } from "../shared/constant";
import Header from "../components/header";
import Ripple from "../components/ripple";

const DayRank = dynamic(import("../components/day-rank"), {
  ssr: false,
  loading: () => <li className="ranking__loading"></li>,
});

const SelectDate = dynamic(import("../components/select-date"), {
  ssr: false,
  loading: () => <span></span>,
});

const GA = dynamic(import("../components/ga"), {
  ssr: false,
  loading: () => <span></span>,
});

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickToLoad = this.handleClickToLoad.bind(this);
    this.handleClickDate = this.handleClickDate.bind(this);
    this.query = config.get("query");
    this.DATE = DATE;
  }

  state = {
    value: 1,
    year: moment().format("YYYY"),
    month: moment().format("MM"),
    day: moment().format("DD"),
    max: 365,
    data: [],
    load: true,
    query: this.query,
    isAlertOpen: null,
  };

  open = (isAlertOpen) => this.setState({ isAlertOpen });
  close = (isAlertOpen) => this.setState({ isAlertOpen });
  secondaryAction = ({ target }) => console.log(target.innerText);

  static async getInitialProps({ query }) {
    query.locale = query.locale || config.get("query").locale;
    query.ratings = query.ratings || config.get("query").ratings;
    query.date = query.date || moment().format("YYYYMMDD");
    const response = await axios.get(
      `https://${config.get("apiUrl")}/top20/${query.locale}/${query.ratings}`
    );
    return {
      data: response.data,
      query,
    };
  }

  onSliderChange = (value) => {
    const date = this.state.keys[value];
    const data = this.rankData[date];
    const query = {
      locale: this.props.query.locale,
      ratings: this.props.query.ratings,
      date,
    };
    this.setState({
      value,
      data,
      ...util.getDate(date),
      query,
    });
    console.log(this.state);
  };

  onAfterChange = (value) => {
    const date = this.state.keys[value];
    this.setState({
      keys: this.getKeys(date),
      value: this.getKeys(date).findIndex((key) => key === date),
      max: this.getKeys(date).length,
    });
  };

  getByMonthKeys = (year, month) => {
    const regexp = new RegExp(`^(${year}${month})`);
    return this.rankDatakeys.filter((day) => regexp.test(day));
  };

  getByYearKeys = (year) => {
    /* const regexp = new RegExp(`^(${year})+`)
    return this.rankDatakeys.filter(day => regexp.test(day)) */
    return this.rankDatakeys;
  };

  getKeys = (anchorDate) => {
    const RANGE = 60;
    const anchor = this.rankDatakeys.findIndex((key) => key === anchorDate);
    const RANGE_LEFT = anchor - RANGE < 0 ? 0 : anchor - RANGE;
    const leftKeys = this.rankDatakeys.slice(RANGE_LEFT, anchor);
    const rightKeys = this.rankDatakeys.slice(anchor, anchor + RANGE);
    return leftKeys.concat(rightKeys);
  };

  UNSAFE_componentWillMount() {
    const {
      data: { rankData, comics },
    } = this.props.data;
    this.rankData = rankData;
    this.rankDatakeys = Object.keys(rankData).sort();
    this.comics = comics;

    const lastDate = this.rankDatakeys.sort()[this.rankDatakeys.length - 1];
    const firstDate = this.rankDatakeys.sort()[0];
    const emptyDay = this.props.query.date > firstDate ? lastDate : firstDate;
    const date =
      this.getKeys(this.props.query.date).findIndex(
        (key) => key === this.props.query.date
      ) > -1
        ? this.props.query.date
        : emptyDay;
    const objectDate = util.getDate(date);
    const keys = this.getKeys(date);
    const value = keys.findIndex((key) => key === date);

    this.setState({
      ...objectDate,
      keys: keys,
      value,
      max: keys.length,
      data: this.rankData[date] || [],
      query: {
        locale: this.props.query.locale,
        ratings: this.props.query.ratings,
        date,
      },
    });
  }

  componentDidUpdate() {
    localStorage.query = JSON.stringify(this.state.query);
  }

  componentDidMount() {
    this.setState({
      load: false,
    });
    localStorage.query = JSON.stringify(this.state.query);
  }

  handleClickToLoad = (locale) => {
    if (locale) {
      const html = document.querySelector("html");
      html.lang = util.getLanguageCode(locale);
    }
    this.setState({
      load: true,
    });
  };

  handlePrevDay = () => {
    const value = this.state.value === 0 ? 0 : this.state.value - 1;
    this.onSliderChange(value);
  };

  handleNextDay = () => {
    const value =
      this.state.value === this.state.max - 1
        ? this.state.max - 1
        : this.state.value + 1;
    this.onSliderChange(value);
  };

  /* handleOnSwipedLeft = (e, originX, x) => {
    originX + 100 < x && this.handlePrevDay()
    
  }

  handleOnSwipedRight = (e, originX, x) => {
    originX - 100 > x && this.handleNextDay()
  } */

  handleClickDate(e) {
    const value = e.currentTarget.dataset.value;
    const type = e.currentTarget.dataset.type;
    const DATE = this.DATE;
    let day;
    let date;
    switch (type) {
      case "YEAR":
        DATE["DAY"][1] = util.getIntercalation(value, this.state.month);
        day =
          +this.state.day > DATE["DAY"][+this.state.month - 1]
            ? DATE["DAY"][+this.state.month - 1]
            : this.state.day;
        date = `${value}${this.state.month}${day}`;
        this.setState({
          year: value,
        });
        break;
      case "MONTH":
        DATE["DAY"][1] = util.getIntercalation(this.state.year, value);
        day =
          +this.state.day > DATE["DAY"][+value - 1]
            ? DATE["DAY"][+value - 1]
            : this.state.day;
        date = `${this.state.year}${value}${day}`;
        this.setState({
          month: value,
        });
        break;
      case "DAY":
        DATE["DAY"][1] = util.getIntercalation(
          this.state.year,
          this.state.month
        );
        day =
          value > DATE["DAY"][+this.state.month - 1]
            ? DATE["DAY"][+this.state.month - 1]
            : value;
        day = day > 9 ? day : "0" + day;
        date = `${this.state.year}${this.state.month}${day}`;
        this.setState({
          day,
        });
        break;
    }

    if (this.getKeys(date).findIndex((key) => key === date) > -1) {
      Router.push(
        `/ranking/${this.state.query.locale}/${this.state.query.ratings}/${date}`
      );
    } else {
      this.open("alert:emptyDay");
    }

    return false;
  }

  render() {
    const { isAlertOpen } = this.state;
    const actions = [{ text: "확인", onClick: this.close }];

    return (
      <>
        {/* <ReactSwipeEvents
        onSwipedLeft={this.handleOnSwipedRight}
        onSwipedRight={this.handleOnSwipedLeft}
      > */}
        <div className={`container load load-${this.state.load || "false"}`}>
          <div className="header">
            <Header
              handleClickToLoad={this.handleClickToLoad}
              query={this.props.query}
            />
            <div className="control">
              <div className="control__inner">
                <div className="current">
                  <a className="current__prev" onClick={this.handlePrevDay}>
                    <i className="fas fa-chevron-circle-left" />
                  </a>
                  <span className="current__date">
                    <a className="current__year">
                      <SelectDate
                        handleClickDate={this.handleClickDate}
                        type="YEAR"
                        label={this.state.year}
                      />
                    </a>
                    <a className="current__month">
                      <SelectDate
                        handleClickDate={this.handleClickDate}
                        type="MONTH"
                        label={this.state.month}
                      />
                    </a>
                    <a className="current__day">
                      <SelectDate
                        handleClickDate={this.handleClickDate}
                        type="DAY"
                        label={this.state.day}
                        year={this.state.year}
                        month={this.state.month}
                      />
                    </a>
                  </span>
                  <a className="current__next" onClick={this.handleNextDay}>
                    <i className="fas fa-chevron-circle-right" />
                  </a>
                </div>
                {isAlertOpen === "alert:emptyDay" && (
                  <Modal
                    actions={actions}
                    appearance="danger"
                    onClose={this.close}
                    heading={`데이터 없음`}
                  >
                    <p>선택한 날짜의 랭킹 데이터가 존재하지 않습니다.</p>
                  </Modal>
                )}
                <div className="slider">
                  <Slider
                    value={this.state.value}
                    min={0}
                    max={this.state.max - 1}
                    onChange={this.onSliderChange}
                    onAfterChange={this.onAfterChange}
                    // tipFormatter={(v) => util.getStringFromDate(util.getDate(this.getByYearKeys(this.state.year)[v]), true)}
                    dots={true}
                    // marks={{'1': '1월', '100': '12월'}}
                  />
                </div>
              </div>
            </div>
            <h1 className="header__logo">
              <span className="header__text"></span>
            </h1>
          </div>
          <div className="contents type-list">
            <div className="ranking">
              <ul className="ranking__list">
                {
                  <DayRank
                    data={this.state.data}
                    comics={this.comics}
                    locale={this.state.query.locale}
                  />
                }
              </ul>
            </div>
          </div>
          <Ripple />
        </div>
        {/* </ReactSwipeEvents> */}
        <GA />
      </>
    );
  }
}

export default Ranking;
