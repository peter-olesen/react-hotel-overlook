import s from "./Main.module.scss";

export const Main = ({ children }) => {
  return <main className={s.Main}>{children}</main>;
};
