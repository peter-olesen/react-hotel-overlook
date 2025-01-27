import { Navigation } from "../Navigation/Navigation";
import s from "./Header.module.scss";
import logo from "../../assets/hotel-overlook-logo.svg";

export const Header = () => {
  return (
    <header className={s.Header}>
      <div className={s.Container}>
        <img src={logo} alt="Hotel Overlook" />
        <Navigation />
      </div>
    </header>
  );
};
