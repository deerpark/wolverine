import Document, { Head, Main, NextScript } from 'next/document'
import util from '../shared/util'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { title: 'Wolverine', description: 'Lezhin Lanking', ...initialProps, query : ctx.query }
  }

  render() {
    return (
      <html lang={util.getLanguageCode(this.props.query.locale)}>
        <Head>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossOrigin="anonymous" />
          <link rel="stylesheet" href={`https://fonts.googleapis.com/earlyaccess/notosans${util.getCountryCode(this.props.query.locale, 'en-US')}.css`} />
          <link rel="stylesheet" href="/static/stylesheets/reset.css" />
          <link rel="stylesheet" href="/static/stylesheets/slider.css" />
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link rel="icon" href="/static/favicon.ico" />
          <link rel="icon" sizes="192x192" href="https://cdn.lezhin.com/assets/favicon/192x192.png" />
          <link rel="apple-touch-icon-precomposed" href="//cdn.lezhin.com/files/assets/page/image/ico-ios-kr.png" />
          <title>Lezhin Ranking</title>
          <meta name="description" content="Check out the past Lezhin comics rankings!" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
      </html>
    )
  }
}