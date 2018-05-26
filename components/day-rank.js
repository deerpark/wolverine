import config from '../shared/config'
import Link from 'next/link'
import util from '../shared/util'

const UA = navigator.userAgent.toLowerCase()
const isMobile = window.innerWidth < 481
const isAndroid = UA.indexOf('android') > -1
const getThumbnail = id => id ? `//${config.get('cdnUrl')}/comics/${id}/images/${isMobile ? 'square' : 'tall'}?&width=200` : '/static/thumbnail-default.png'

export default ({ data = [], comics, locale}) => {
  const list = data.map((value, index) => {
    const country = util.getLanguageCode(locale)
    const protocal = isAndroid ? `lezhin://comic/` : `//www.lezhin.com/${country}/comic/`
    const comic = {
      ...comics[value]
    }
    const genreList = comic.genres ? 
      comic.genres.map((genre, i) => 
      (<span className="ranking__genre" key={i}>{genre.name}</span>)) : 
      <span className="ranking__genre"></span>

    return (
      <li className={`ranking__item ranking__item--${index}`} key={index}>
        <a className="ranking__a" href={`${protocal}${comic.alias}`} target="_blank">
          <div className="ranking__order">{index + 1}</div>
          <div className="ranking__thumbnail" style={{ backgroundImage: `url(${getThumbnail(comic.id)})` }}></div>
          <div className="ranking__summary">{comic.title}</div>
          <div className="ranking__info">
            <div className="ranking__title">{comic.title}</div>
            <div className="ranking__genres">{genreList}</div>
          </div>
        </a>
      </li>
    )
  })
  return list
}
