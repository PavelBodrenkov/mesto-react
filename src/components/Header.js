import logo from './../images/logo.svg';

function Header () {
    return (
        <header className="header line">
        <img src={logo} alt="логотип" className="header__logo" />
      </header>
    )
}

export default Header