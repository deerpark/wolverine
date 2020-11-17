// pages/_app.js
import "../scss/ripple.scss";
import "../scss/nav.scss";
import "../scss/header.scss";
import "../scss/ranking.scss";
import "../scss/day-rank.scss";
import "../scss/index.scss";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
