import Link from 'next/link'
import Head from 'next/head'
import Header from '../components/header'

export default ({ children, title = 'Wolverine', description = 'Lezhin Lanking', query }) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous" />
      <link rel="stylesheet" href="/static/reset.css" />
      <link rel="stylesheet" href="/static/slider.css" />
      <link rel="stylesheet" href="/_next/static/style.css" />
      <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
      <link rel="apple-touch-icon" href="/static/touch-icon.png" />
      <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
      <link rel="icon" href="/static/favicon.ico" />
    </Head>

    <Header query={query} />

    <div className="container">
      {children}
    </div>
  </>
)