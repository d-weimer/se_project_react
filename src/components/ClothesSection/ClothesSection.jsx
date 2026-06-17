import React, { useContext } from "react";

import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function ClothesSection({
  handleAddClick,
  clothingItems,
  handleCardClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter((item) => {
    return (
      item.owner === currentUser?._id || item.owner?._id === currentUser?._id
    );
  });

  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__title">Your items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__add-clothes-button"
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}
