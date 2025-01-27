import s from "./Slider.module.scss";
export const Slider = () => {
  return (
    <div className={s.Slider}>
      <div className={s.Container}>
        <h2>Velkommen til Hotel Overlook Online</h2>
        <span className={s.RedThing}></span>
      </div>
    </div>
  );
};
