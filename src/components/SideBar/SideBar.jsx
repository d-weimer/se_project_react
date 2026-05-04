import "./SideBar.css";
import avatarDefault from "../../assets/avatar.png";

export default function SideBar() {
  const username = "Terrence Tegegne";
  const avatar = avatarDefault;

  return (
    <aside className="sidebar">
      <div className="sidebar__container">
        <img className="sidebar__avatar" src={avatar} alt="Terrence Tegegne" />
        <p className="sidebar__username">{username}</p>
      </div>
    </aside>
  );
}
