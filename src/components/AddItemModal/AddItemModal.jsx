import { useEffect } from "react";
import { useForm } from "../../hooks/useForm.js";

import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weatherType: "",
  };
  const { values, handleChange, setValues } = useForm(defaultValues);

  const isFormInvalid = !values.name || !values.imageUrl || !values.weatherType;

  useEffect(() => {
    if (isOpen) {
      setValues(defaultValues);
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!isFormInvalid) {
      onAddItem(values);
    }
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      isDisabled={isFormInvalid}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className={`modal__input ${!values.name ? "modal__input_type_error" : ""}`}
          id="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
        <span
          className={`modal__error ${!values.name ? "modal__error_visible" : ""}`}
          id="name_error"
        >
          {!values.name && "Name is required."}
        </span>
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          name="imageUrl"
          className={`modal__input ${!values.imageUrl ? "modal__input_type_error" : ""}`}
          id="imageUrl"
          placeholder="Image URL"
          required
          value={values.imageUrl}
          onChange={handleChange}
        />
        <span
          className={`modal__error ${!values.imageUrl ? "modal__error_visible" : ""}`}
          id="imageUrl-error"
        >
          {!values.imageUrl && "Please enter a URL."}
        </span>
      </label>
      <fieldset className="modal__radio-buttons">
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
          className={`modal__error ${!values.weatherType ? "modal__error_visible" : ""}`}
        >
          {!values.weatherType && "Required"}
        </span>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
