import { Navigation } from "../Navigation/Navigation";
import s from "./Header.module.scss";
import logo from "../../assets/hotel-overlook-logo.svg";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className={s.Header}>
      <div className={s.Container}>
        <NavLink to="/">
          <img src={logo} alt="Hotel Overlook" />
        </NavLink>
        <Navigation />
      </div>
    </header>
  );
};
