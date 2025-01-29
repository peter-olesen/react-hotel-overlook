import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "../layouts/Layout";

// Pages
import { Home } from "../pages/Home";
import { PageNotFound } from "../pages/PageNotFound";
import { Hotels } from "../pages/Hotels";
import { Rooms } from "../pages/rooms";
import { Reservation } from "../pages/Reservation";
import { Login } from "../pages/Login";
import { Country } from "../pages/Country";
import { Signup } from "../pages/Signup";

export const Router = () => {
  const location = useLocation();

  useEffect(() => {
    const pageTitles = {
      "/": "Hotel Overlook",
      "/hotels-destinations": "Hoteller & Destinationer - Hotel Overlook",
      "/rooms": "Værelser - Hotel Overlook",
      "/reservation": "Reservation - Hotel Overlook",
      "/login": "Login - Hotel Overlook",
    };

    const currentTitle = pageTitles[location.pathname];
    if (currentTitle) {
      document.title = currentTitle;
    } else {
      document.title = "404 - Page Not Found";
    }
  }, [location]);

  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={"/hotels-destinations"} element={<Hotels />} />
        <Route path={"/country/:slug"} element={<Country />} />
        <Route path={"/city/:slug"} element={<Country />} />
        <Route path={"/hotel/:slug"} element={<Hotels />} />
        <Route path={"/rooms"} element={<Rooms />} />
        <Route path={"/reservation"} element={<Reservation />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />

        <Route path={"/*"} element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};
