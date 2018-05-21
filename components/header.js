import Nav from './nav'
import './header.scss'

const Header = ({ query, handleClickToLoad }) => (
    <div className="header__inner">
        <nav className="header__wrap">
            <Nav handleClickToLoad={handleClickToLoad} query={query} />
            <h1 className="header__logo"><span className="header__text">레진차트</span></h1>
        </nav>
    </div>
)

export default Header
