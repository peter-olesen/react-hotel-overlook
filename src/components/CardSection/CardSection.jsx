import s from "./CardSection.module.scss";

export const CardSection = ({ title, children }) => {
  return (
    <section>
      <h3>{title}</h3>
      <div className={s.CardSection}>{children}</div>
    </section>
  );
};
