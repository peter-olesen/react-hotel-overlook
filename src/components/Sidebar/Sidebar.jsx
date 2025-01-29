import s from "./Sidebar.module.scss";

export const Sidebar = ({ children }) => {
  return <div className={s.Sidebar}>{children}</div>;
};
