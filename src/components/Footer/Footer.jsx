import { FaSquareTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { Copyright } from "../Copyright/Copyright";
import s from "./Footer.module.scss";

import { PATHS } from "../../router/paths";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className={s.Footer}>
      <div className={s.Container}>
        <Copyright siteName="Hotel Overlook" />
        <div className={s.SocialIcons}>
          <FaSquareTwitter />
          <FaFacebook />
        </div>
        <div>
          <ul className={s.FooterNavigation}>
            {PATHS.map((item) => {
              return (
                <li key={item.name}>
                  <NavLink to={item.path}>{item.name}</NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
};
