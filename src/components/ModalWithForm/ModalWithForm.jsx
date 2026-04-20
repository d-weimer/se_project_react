import "./ModalWithForm.css";
import modalClose from "../../assets/modal-close.svg";

function ModalWithForm({ children, title, buttonText, isOpen, onClose }) {
  return (
    <div className={`modal ${isOpen === "add-garment" ? "modal__opened" : ""}`}>
      <div className="modal__content">
        <button onClick={onClose} type="button" className="modal__close">
          <img
            src={modalClose}
            alt="Close Button"
            className="modal__close-button"
          />
        </button>
        <p className="modal__title">{title}</p>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
