import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import SideBar from "../SideBar/SideBar.jsx";

export default function Profile({
  handleAddClick,
  clothingItems,
  handleCardClick,
  onEditProfileClick,
  onLogOut,
  onCardLike,
}) {
  return (
    <section className="profile">
      <SideBar onEditProfileClick={onEditProfileClick} onLogOut={onLogOut} />
      <ClothesSection
        handleAddClick={handleAddClick}
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        onCardLike={onCardLike}
      />
    </section>
  );
}
