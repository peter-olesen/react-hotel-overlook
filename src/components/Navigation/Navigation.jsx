import { NavLink } from "react-router-dom";
import { PATHS } from "../../router/paths";
import s from "./Navigation.module.scss";

export const Navigation = () => {
  return (
    <nav className={s.Navigation}>
      <ul className={s.TopNavigation}>
        {PATHS.map((item) => {
          return (
            <li key={item.name}>
              <NavLink to={item.path}>{item.name}</NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
