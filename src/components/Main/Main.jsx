import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { Sidebar } from "../Sidebar/Sidebar";
import s from "./Main.module.scss";

export const Main = ({ children, sidebar }) => {
  if (sidebar === true) {
    return (
      <>
        <Breadcrumbs />
        <main className={s.MainSidebar}>
          <div>{children}</div>
          <Sidebar />
        </main>
      </>
    );
  } else {
    return <main className={s.Main}>{children}</main>;
  }
};
