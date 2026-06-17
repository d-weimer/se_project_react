import React, { useState, useEffect, useContext } from "react";

import "./EditProfileModal.css";
import modalClose from "../../assets/modal-close.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({ isOpen, onCloseModal, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarChange = (e) => setAvatar(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, avatar });
  };

  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content modal__content_type_form">
        <button onClick={onCloseModal} type="button" className="modal__close">
          <img
            src={modalClose}
            alt="Close Button"
            className="modal__close-button"
          />
        </button>
        <h2 className="modal__title">Change profile data</h2>
        <form onSubmit={handleSubmit} className="modal__form">
          <label className="modal__label">
            Name *
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="modal__input"
              value={name}
              onChange={handleNameChange}
              required
            />
          </label>
          <label className="modal__label">
            Avatar *
            <input
              type="url"
              name="avatar"
              placeholder="Avatar URL"
              className="modal__input"
              value={avatar}
              onChange={handleAvatarChange}
              required
            />
          </label>
          <button type="submit" className="modal__submit-button">
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
