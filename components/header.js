import Nav from "./nav";

const Header = ({ query, handleClickToLoad }) => (
  <div className="header__inner">
    <nav className="header__wrap">
      <Nav handleClickToLoad={handleClickToLoad} query={query} />
    </nav>
  </div>
);

export default Header;
