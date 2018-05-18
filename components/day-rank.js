import Link from 'next/link'
import './day-rank.scss'

const imageUrl = (id) => `https://cdn.lezhin.com/v2/comics/${id}/images/square?&width=200`

export default ({data, comics}) => {
  const list = data.map((value, index) => {
    const comic = {
      id: comics[value].id,
      title: comics[value].title,
      genres: comics[value].genres,
      alias: comics[value].alias,
    }
    const genreList = comic.genres.map((genre, index) => (<span className="ranking__genre" key={index}>{genre.name}</span>))
    return (<>
      <li className={`ranking__item ranking__item--${index}`} key={index}>
        <a className="ranking__a" href={`https://www.lezhin.com/ko/comic/${comic.alias}`} target="_blank">
        <div className="ranking__order">{index + 1}</div>
        <div className="ranking__thumbnail" style={{ backgroundImage: `url(${imageUrl(comic.id)})` }}></div>
        <div className="ranking__info">
          <div className="ranking__title">{comic.title}</div>
          <div className="ranking__genres">{genreList}</div>
        </div>
        </a>
      </li>
    </>)
  })
  return <>
    {list}
  </>
}
