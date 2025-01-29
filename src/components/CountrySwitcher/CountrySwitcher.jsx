import { NavLink, useParams } from "react-router-dom";
import { useBearerToken } from "../../hooks/useBearerToken";
import s from "./CountrySwitcher.module.scss";

export const CountrySwitcher = ({ setCountry, isActive }) => {
  const {
    data: countries,
    isLoading,
    error,
  } = useBearerToken("http://localhost:4000/destinations");

  return (
    <div className={s.CountrySwitcher}>
      <ul>
        {countries?.map((item) => {
          return (
            <li onClick={() => setCountry(item.slug)} key={item.id}>
              <NavLink to={`/country/${item.slug}`}>{item.name}</NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
