import React, { useContext } from "react";

import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    onCardLike({ id: item._id, isLiked: isLiked });
  };

  const itemLikeButtonClassName = `item-card__like-btn ${
    isLiked ? "item-card__like-btn_active" : ""
  }`;

  return (
    <li className="item-card">
      <p className="item-card__name">{item.name}</p>
      {currentUser && (
        <button
          type="button"
          className={`item-card__like-button ${
            isLiked ? "item-card__like-button_liked" : ""
          }`}
          onClick={handleLike}
          aria-label={isLiked ? "Unlike item" : "Like item"}
        />
      )}
      <img
        onClick={handleCardClick}
        className="item-card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
