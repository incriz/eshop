import { useState } from "react";
import styles from "./header.module.scss";
import HeaderCart from "./header-cart";
import Logo from "./logo";
import { HiOutlineMenu } from "react-icons/hi";
import Navbar from "./navbar";

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPage, setScrollPage] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const fixNavbar = () => {
    if (window.scrollY > 5) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };

  window.addEventListener("scroll", fixNavbar);

  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>
      <div className={styles.header}>
        <Logo />
        <Navbar showMenu={showMenu} hideMenu={hideMenu} />

        <div className={styles["menu-icon"]}>
          <HeaderCart />
          <HiOutlineMenu size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};
