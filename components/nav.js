import Link from "next/link";
import Router from "next/router";
import dynamic from "next/dynamic";
import Button from "@atlaskit/button";
import { RATINGLINKS } from "../shared/constant";

const LanguageMenu = dynamic(import("./language-menu"), {
  ssr: false,
  loading: () => <span className="link">...</span>,
});

const handleChangeRating = (e) => {
  const localStorageQuery = JSON.parse(localStorage.query);
  const _query = localStorageQuery ? localStorageQuery : this.props.query;
  Router.push(
    `/ranking/${_query.locale}/${e.currentTarget.dataset.ratings}/${_query.date}`
  );
};

const Nav = ({ query, handleClickToLoad }) => (
  <nav className="nav">
    <ul>
      <li className="nav__left">
        <a href="/" onClick={handleClickToLoad} className="btn-home">
          <i className="fas fa-home" />
        </a>
      </li>
      <li className="nav__center">
        <ul className="nav__group">
          {RATINGLINKS.map(({ ratings, label, id, active }, index) => (
            <li
              /* onClick={handleClickToLoad} */ className={
                ratings === query.ratings && active
                  ? `nav__button--${id} active`
                  : `nav__button--${id}`
              }
              key={index}
            >
              <a
                className="link"
                data-ratings={ratings} /* onClick={handleChangeRating} */
              >
                <span>{label[query.locale]}</span>
              </a>
            </li>
          ))}
        </ul>
      </li>
      <li className="nav__right">
        <ul>
          <li>
            <LanguageMenu handleClickToLoad={handleClickToLoad} query={query} />
          </li>
        </ul>
      </li>
    </ul>
  </nav>
);

export default Nav;
