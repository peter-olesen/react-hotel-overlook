import { NavLink, useLocation } from "react-router-dom";
import s from "./Breadcrumbs.module.scss";

export const Breadcrumbs = () => {
  const location = useLocation();

  const paths = {
    "/hotels-destinations": "Hoteller & Destinationer",
    "/rooms": "Værelser",
    "/reservation": "Reservation",
    "/login": "Login",
    "/signup": "Opret ny bruger",
    "/country/danmark": "Danmark",
    "/country/sverige": "Sverige",
    "/country/finland": "Finland",
    "/country/norge": "Norge",
    "/country/tyskland": "Tyskland",
    "/country/polen": "Polen",
    "/country/island": `Hoteller & Destinationer > Island`,
  };

  const crumb = paths[location.pathname];
  const path = paths[location];

  return (
    <div className={s.Breadcrumbs}>
      <NavLink to="/">Hotel Overlook</NavLink>{" "}
      <span className={s.Seperator}>&gt;</span>{" "}
      <NavLink to={path}>{crumb}</NavLink>
    </div>
  );
};
