import { NavLink } from "react-router-dom";
import { truncateText } from "../../helpers/truncateText";
import s from "./Card.module.scss";

export const Card = ({ imgSrc, title, path }) => {
  return (
    <NavLink to={path}>
      <div className={s.Card}>
        <img src={imgSrc} alt="" />
        <p>{truncateText(title, 30)}</p>
      </div>
    </NavLink>
  );
};
