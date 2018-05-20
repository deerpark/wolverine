import Link from 'next/link'
import dynamic from 'next/dynamic'
import Button from '@atlaskit/button'
import './nav.scss'

const LanguageMenu = dynamic(import('./language-menu'), {
  ssr: false,
  loading: () => <span className="link">...</span>
})

const links = [
  { href: `/ranking/ko-KR/kid/20180101`, value: 'kid', label: '전연령', id: 1, active: true },
  { href: `/ranking/ko-KR/all/20180101`, value: 'all', label: '완전판', id: 3, active: true },
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
  })

const handleToggleType = (e) => {
  const contents = document.querySelector('.contents').classList
  const currentTarget = e.currentTarget.querySelector('.fas').classList
  const type = currentTarget.contains('fa-th-list') ? 'grid' : 'list'
  currentTarget.remove('fa-th-list')
  currentTarget.remove('fa-th-large')
  currentTarget.add(`fa-th-${type === 'list' ? type : 'large'}`)
  contents.remove('type-list')
  contents.remove('type-grid')
  contents.add(`type-${type}`)
  localStorage.setItem('__lz__ranking.type', type)
}
      
const Nav = ({ query }) => (
  <nav className="nav">
    <ul>
      <li className="nav__left">
        <a className="link" onClick={handleToggleType}><i className="fas" /></a>
        <Link prefetch href="/">
          <a className="link hidden"><i className="fas fa-home" /></a>
        </Link>
      </li>
      <li className="nav__center">
        <ul className="nav__group">
          {links.map(
            ({ key, href, value, label, id, active }) => (
              <li className={value === query.adult && active ? `nav__button--${id} active` : `nav__button--${id}`} key={key}>
                <Link href={query.lang ? `/ranking/${query.lang}/${value}/${query.date}` : href}>
                  <a className="link"><span>{label}</span></a>
                </Link>
              </li>
            )
          )}
        </ul>
      </li>
      <li className="nav__right">
        <ul>
          <li>
              <LanguageMenu query={query} />
          </li>
          {/* <li>
            <Link prefetch href="/settings">
              <a><Button appearance="link"><i className="fas fa-cog" /></Button></a>
            </Link>
          </li> */}
        </ul>
      </li>
    </ul>
  </nav>
)

Nav.getInitialProps = ({ query: { lang, adult, date } }) => {
  return {
    ...query
  }
}

export default Nav
