import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header({ handleAddClick }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} />
      <p className="header__date-and-location">June 15, New York</p>
      <div className="header__container">
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-button"
        >
          + Add clothes
        </button>
        <p className="header__username">Terrence Tegegne</p>
      </div>
      <img className="header__avatar" src={avatar} alt="Terrence Tegegne" />
    </header>
  );
}

export default Header;
