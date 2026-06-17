import { useEffect } from "react";
import { useForm } from "../../hooks/useForm.js";

import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weatherType: "",
  };
  const { values, handleChange, handleReset } = useForm(defaultValues);

  const isFormValid =
    values.name.trim() !== "" &&
    values.imageUrl.trim() !== "" &&
    values.weatherType !== "";

  const submitButtonClassName = `modal__submit ${
    isFormValid ? "modal__submit_active" : ""
  }`;

  useEffect(() => {
    if (!isOpen) {
      handleReset();
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    if (isFormValid) {
      onAddItem(values, handleReset);
    }
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      isDisabled={isFormValid}
      buttonClassName={submitButtonClassName}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
        <span
          className={`modal__error-message ${
            values.name === ""
              ? ""
              : !values.name
                ? "modal__error-message_visible"
                : ""
          }`}
          id="name_error"
        >
          Name is required.
        </span>
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          required
          value={values.imageUrl}
          onChange={handleChange}
        />
        <span
          className={`modal__error-message ${
            values.imageUrl === ""
              ? ""
              : !values.imageUrl
                ? "modal__error-message_visible"
                : ""
          }`}
          id="imageUrl-error"
        >
          Please enter a URL.
        </span>
      </label>
      <fieldset className="modal__radio-buttons modal__radio-buttons_type_add-garment">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            id="hot"
            value="hot"
            checked={values.weatherType === "hot"}
            onChange={handleChange}
            required
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            id="warm"
            value="warm"
            checked={values.weatherType === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            id="cold"
            value="cold"
            checked={values.weatherType === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
        <span
          className={`modal__error-message ${
            values.weatherType === ""
              ? ""
              : !values.weatherType
                ? "modal__error-message_visible"
                : ""
          }`}
        >
          Required
        </span>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
