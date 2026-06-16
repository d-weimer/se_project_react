import React, { useContext, useState, useEffect } from "react";

import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({ onEditProfileClick }) {
  const currentUser = useContext(CurrentUserContext);
  const [hasAvatarError, setHasAvatarError] = useState(false);

  useEffect(() => {
    setHasAvatarError(false);
  }, [currentUser]);

  const userInitial = currentUser?.name
    ? currentUser.name.charAt(0).toUpperCase()
    : "";

  return (
    <aside className="sidebar">
      <div className="sidebar__container">
        {currentUser?.avatar && !hasAvatarError ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt={currentUser.name}
            onError={() => setHasAvatarError(true)}
          />
        ) : (
          <div className="sidebar__avatar-placeholder">{userInitial}</div>
        )}
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <button
        type="button"
        className="sidebar__edit-profile-button"
        onClick={() => {
          onEditProfileClick();
        }}
      >
        Edit profile
      </button>
    </aside>
  );
}
