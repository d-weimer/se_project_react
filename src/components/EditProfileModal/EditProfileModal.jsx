import React, { useState, useEffect, useContext } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({ isOpen, onCloseModal, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const isFormValid = name.trim().length > 0 && avatar.trim().length > 0;

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
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
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
    </ModalWithForm>
  );
}

export default EditProfileModal;
