import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";
import config from "../shared/config";
import util from "../shared/util";
import moment from "moment";

const images = [
  "/flag-japan.svg",
  "/flag-south-korea.svg",
  "/flag-united-states.svg",
  "/logo-type-text-en.svg",
  "/logo-type-text-ja.svg",
  "/logo-type-text.svg",
  "/slider-handle.svg",
];

const preCacheImages = new Promise((resolve) => {
  const newCache = images.map((image) => {
    const newImage = new Image(0, 0);
    newImage.src = image;
    return newImage;
  });
  newCache[newCache.length - 1].onload = () => resolve();
});

const query = localStorage.query
  ? JSON.parse(localStorage.query)
  : {
      locale: config.get("query").locale,
      ratings: config.get("query").ratings,
      date: moment().format("YYYYMMDD"),
    };

class Index extends React.Component {
  componentDidMount() {
    preCacheImages.then(() => {
      Router.push(
        `/${query.locale}/ranking/${query.ratings}/${moment().format(
          "YYYYMMDD"
        )}`
      );
    });
  }

  render() {
    return <div className="redirect"></div>;
  }
}

export default Index;
