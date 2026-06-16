import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  handleRegisterClick,
  handleLoginClick,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [hasAvatarError, setHasAvatarError] = useState(false);

  useEffect(() => {
    setHasAvatarError(false);
  }, [currentUser]);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const userInitial = currentUser?.name
    ? currentUser.name.charAt(0).toUpperCase()
    : "";

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
              <p className="header__username">{currentUser?.name}</p>
              {currentUser?.avatar && !hasAvatarError ? (
                <img
                  className="header__avatar"
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  onError={() => setHasAvatarError(true)}
                />
              ) : (
                <div className="header__avatar-placeholder">{userInitial}</div>
              )}
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
