import "./ItemCard.css";

function ItemCard({ item }) {
  return (
    <li className="item-card">
      <p className="item-card__name">{item.name}</p>
      <img className="item-card__image" src={item.link} alt={item.name} />
    </li>
  );
}

export default ItemCard;
