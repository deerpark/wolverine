import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { title: 'Wolverine', description: 'Lezhin Lanking', ...initialProps, query : ctx.query }
  }

  getLangCode = (lang) => {
    const langCode = lang ? lang : 'ko-KR'
    return langCode.slice(0, 2)
  }

  render() {
    return (
      <html lang={this.getLangCode(this.props.query.lang)}>
        <Head>
          <title>Lezhin Ranking</title>
          <meta name="description" content="Check out the past Lezhin comics rankings!" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
          <link rel="apple-touch-icon" href="/static/touch-icon.png" />
          <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
          <link rel="icon" href="/static/favicon.ico" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossOrigin="anonymous" />
          <link rel="stylesheet" href="/static/reset.css" />
          <link rel="stylesheet" href="/static/slider.css" />
          <link rel="stylesheet" href="/_next/static/style.css" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
      </html>
    )
  }
}