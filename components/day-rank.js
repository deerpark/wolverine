import Link from 'next/link'
import './day-rank.scss'

const imageUrl = (id, wide) => id ? `https://cdn.lezhin.com/v2/comics/${id}/images/${wide ? 'wide' : 'square'}?&width=${wide ? 648 : 200}` : '/static/thumbnail-default.png'

export default ({data, comics, lang}) => {
  const list = data.map((value, index) => {
    const langCode = lang ? lang.slice(0, 2) : 'ko'
    const comic = {
      ...comics[value]
    }
    const genreList = comic.genres ? comic.genres.map((genre, i) => (<span className="ranking__genre" key={i}>{genre.name}</span>)) : <span className="ranking__genre"></span>
    return (
      <li className={`ranking__item ranking__item--${index}`} key={index}>
        <a className="ranking__a" href={`https://www.lezhin.com/${langCode}/comic/${comic.alias}`} target="_blank">
        <div className="ranking__order">{index + 1}</div>
        <div className="ranking__thumbnail" style={{ backgroundImage: `url(${imageUrl(comic.id, index)})` }}></div>
        <div className="ranking__info">
          <div className="ranking__title">{comic.title}</div>
          <div className="ranking__genres">{genreList}</div>
        </div>
        </a>
      </li>
    )
  })
  return <>
    {list}
  </>
}
