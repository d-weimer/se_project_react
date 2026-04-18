import "./ModalWithForm.css";
import modalClose from "../../assets/modal-close.svg";

function ModalWithForm() {
  return (
    <div className="modal">
      <div className="modal__content">
        <button type="button" className="modal__close">
          <img
            src={modalClose}
            alt="Close Button"
            className="modal__close-button"
          />
        </button>
        <p className="modal__title">New garment</p>
        <form className="modal__form">
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image{" "}
            <input
              type="url"
              className="modal__input"
              id="imageUrl"
              placeholder="Image URL"
            />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input type="radio" className="modal__radio-input" id="hot" />
              Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input type="radio" className="modal__radio-input" id="warm" />
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input type="radio" className="modal__radio-input" id="cold" />
              Cold
            </label>
          </fieldset>
        </form>
        <button type="submit" className="modal__submit">
          Add garment
        </button>
      </div>
    </div>
  );
}

export default ModalWithForm;
