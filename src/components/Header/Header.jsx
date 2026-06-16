import { NavLink } from "react-router-dom";

import "./Header.css";
import logo from "../../assets/logo.svg";
import avatarDefault from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleAddClick,
  weatherData,
  handleRegisterClick,
  handleLoginClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const isLoggedIn = false;

  const username = "User";
  const avatar = avatarDefault;

  return (
    <header className="header">
      <NavLink className="header__nav-link_home" to="/">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__container">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-button"
            >
              + Add clothes
            </button>
            <NavLink className="header__nav-link_profile" to="/profile">
              <p className="header__username">{username}</p>
              <img className="header__avatar" src={avatar} alt={username} />
            </NavLink>
          </>
        ) : (
          <div className="header__auth-container">
            <button
              type="button"
              className="header__auth-button"
              onClick={handleRegisterClick}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="header__auth-button"
              onClick={handleLoginClick}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
