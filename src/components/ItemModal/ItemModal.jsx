import React, { useContext } from "react";

import "./ItemModal.css";
import modalClose from "../../assets/modal-close-white.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, card, onCloseModal, onDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn =
    card.owner === currentUser?._id || card.owner?._id === currentUser?._id;

  return (
    <div className={`modal ${activeModal === "preview" && "modal__opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onCloseModal} type="button" className="modal__close">
          <img
            src={modalClose}
            alt="Close Button"
            className="modal__close-button"
          />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <p className="modal__caption">{card.name}</p>
          {isOwn && (
            <button
              onClick={() => onDeleteItem(card._id)}
              type="button"
              className="modal__delete-button"
            >
              Delete item
            </button>
          )}

          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
