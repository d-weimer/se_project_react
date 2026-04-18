import "./ModalWithForm.css";
import modalClose from "../../assets/modal-close.svg";

function ModalWithForm({ children, titleText, buttonText }) {
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
        <p className="modal__title">{titleText}</p>
        <form className="modal__form">{children}</form>
        <button type="submit" className="modal__submit">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ModalWithForm;
