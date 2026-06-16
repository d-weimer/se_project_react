import "./ModalWithForm.css";
import modalClose from "../../assets/modal-close.svg";

function ModalWithForm({
  children,
  title,
  buttonText = "Save",
  isOpen,
  onClose,
  onSubmit,
  altButton,
}) {
  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content">
        <button onClick={onClose} type="button" className="modal__close">
          <img
            src={modalClose}
            alt="Close Button"
            className="modal__close-button"
          />
        </button>
        <h3 className="modal__title">{title}</h3>
        <form onSubmit={onSubmit} className="modal__form">
          {children}

          {/* Flex container to hold the submit button and optional alternative action side-by-side */}
          <div className="modal__submit-container">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            {altButton && altButton}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
