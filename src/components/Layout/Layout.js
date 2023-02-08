import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import "./Layout.module.scss";

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
