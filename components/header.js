import Nav from './nav'
import '../scss/header.scss'
import '../scss/day-rank.scss'

const Header = ({ query, handleClickToLoad }) => (
    <div className="header__inner">
        <nav className="header__wrap">
            <Nav handleClickToLoad={handleClickToLoad} query={query} />
        </nav>
    </div>
)

export default Header
