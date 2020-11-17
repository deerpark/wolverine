import Document, { Head, Main, NextScript } from "next/document";
import config from "../shared/config";
import util from "../shared/util";
import moment from "moment";
import { META } from "../shared/constant";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    ctx.query = ctx.query || {};
    ctx.query.locale = ctx.query?.locale || config.get("query").locale;
    ctx.query.ratings = ctx.query?.ratings || config.get("query").ratings;
    ctx.query.date = ctx.query?.date || moment().format("YYYYMMDD");
    return {
      title: "Lezhin Lanking",
      description: "Lezhin Lanking",
      ...initialProps,
      query: ctx.query,
    };
  }

  render() {
    const locale = util.getLanguageCode(this.props.query.locale);
    return (
      <html lang={locale}>
        <Head>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.0.13/css/all.css"
            integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href={`https://fonts.googleapis.com/earlyaccess/notosans${util.getCountryCode(
              this.props.query.locale,
              "en-US"
            )}.css`}
          />
          <link rel="stylesheet" href="/stylesheets/reset.css" />
          <link rel="stylesheet" href="/stylesheets/slider.css" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="icon"
            sizes="192x192"
            href="https://cdn.lezhin.com/assets/favicon/192x192.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            href="//cdn.lezhin.com/files/assets/page/image/ico-ios-kr.png"
          />

          <title>{META[this.props.query.locale].name}</title>
          <meta
            name="description"
            content={META[this.props.query.locale].desc}
          />
          <meta
            name="keywords"
            content={META[this.props.query.locale].keyword}
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <meta
            property="al:web:url"
            content={`https://www.lezhin.com/${locale}`}
          />
          <meta
            property="og:url"
            content={`https://www.lezhin.com/${locale}`}
          />
          <meta
            property="og:site_name"
            content={META[this.props.query.locale].siteName}
          />
          <meta
            property="og:title"
            content={META[this.props.query.locale].title}
          />
          <meta
            property="og:description"
            content={META[this.props.query.locale].description}
          />
          <meta
            property="og:locale"
            content={META[this.props.query.locale].locale}
          />
          <meta
            property="og:image"
            content={`https://rank.lezhin.com/sns-image-${locale}.png`}
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="600" />
          <meta
            property="og:locale:alternate"
            content={META[this.props.query.locale].locale}
          />

          <meta property="fb:app_id" content="521896137868237" />
          <meta property="fb:admins" content="1268585214" />

          <meta
            name="twitter:image"
            content={`https://rank.lezhin.com/sns-image-${locale}.png`}
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@LezhinComics" />
          <meta
            name="twitter:url"
            content={`https://www.lezhin.com/${locale}`}
          />
          <meta
            name="twitter:title"
            content={META[this.props.query.locale].title}
          />
          <meta
            name="twitter:description"
            content={META[this.props.query.locale].description}
          />
          <meta name="twitter:creator" content="" />

          <meta
            name="twitter:app:name:googleplay"
            content={META[this.props.query.locale].siteName}
          />
          <meta name="twitter:app:id:googleplay" content="com.lezhin.comics" />
          <meta
            name="twitter:app:url:googleplay"
            content={`https://www.lezhin.com/${locale}`}
          />
          <meta
            name="twitter:app:name:iphone"
            content={META[this.props.query.locale].siteName}
          />
          <meta name="twitter:app:id:iphone" content="664973122" />
          <meta name="twitter:app:url:iphone" content="lezhincomics://" />
          <meta
            name="twitter:app:name:ipad"
            content={META[this.props.query.locale].siteName}
          />
          <meta name="twitter:app:id:ipad" content="664973122" />
          <meta name="twitter:app:url:ipad" content="lezhincomics://" />

          <meta
            name="naver-site-verification"
            content="cbd0888e21360276aafb4c63039584754372d71b"
          />
          <meta
            name="google-site-verification"
            content="MizAR6h2_O_WNAwngor3EZNdlB2V3HmvmhPFba9YZw0"
          />

          <link
            rel="alternate"
            hrefLang="ko"
            href={`https://www.lezhin.com/${locale}`}
          />
          <link
            rel="alternate"
            href="android-app://com.lezhin.comics/lezhin/"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
