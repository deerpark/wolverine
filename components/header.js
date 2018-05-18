import Nav from './nav'
import './header.scss'

const Header = ({ query }) => (
    <div className="header">
        <nav className="header__wrap">
            <Nav query={{ ...query }} />
            <div className={query.lang ? 'header__logo' : 'hidden'}></div>
        </nav>
    </div>
)

export default Header
