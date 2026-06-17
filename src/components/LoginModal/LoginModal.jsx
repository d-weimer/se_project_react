import React, { useState, useEffect } from "react";

import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

function LoginModal({
  isOpen,
  handleLogin,
  onCloseModal,
  openRegisterModal,
  authError,
  clearAuthError,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      if (clearAuthError) clearAuthError();
    }
  }, [isOpen]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (authError && clearAuthError) clearAuthError();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (authError && clearAuthError) clearAuthError();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  const submitButtonClassName = `modal__submit ${
    isFormValid ? "modal__submit_active" : ""
  }`;

  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      buttonClassName={submitButtonClassName}
      altButton={
        <button
          type="button"
          className="modal__alt-button"
          onClick={openRegisterModal}
        >
          or Sign Up
        </button>
      }
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {authError && (
        <span className="modal__error">Email or password incorrect</span>
      )}
    </ModalWithForm>
  );
}

export default LoginModal;
