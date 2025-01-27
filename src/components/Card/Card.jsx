import { NavLink } from "react-router-dom";
import s from "./Card.module.scss";

export const Card = ({ imgSrc, title, path }) => {
  return (
    <NavLink to={path}>
      <div className={s.Card}>
        <img src={imgSrc} alt="" />
        <p>{title}</p>
      </div>
    </NavLink>
  );
};
