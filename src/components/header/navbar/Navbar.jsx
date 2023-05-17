import React, { useEffect, useState } from "react";
import styles from "../header.module.scss";
import Logo from "../logo";
import { AdminOnlyLink } from "../../../components";
import { FaTimes, FaUserCircle } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../firebase/config";
import { useDispatch } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../../redux/slice/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShowLogout, ShowOnLogin } from "../../hiddenLink/HiddenLink";
import HeaderCart from "../header-cart";

export const Navbar = ({ showMenu, hideMenu }) => {
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        if (user.displayName == null) {
          const uName = user.email.substring(0, user.email.indexOf("@"));
          const newProfileName = uName.charAt(0).toUpperCase() + uName.slice(1);
          setDisplayName(newProfileName);
        } else {
          setDisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  const logOutUser = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch(error => {
        toast.error(error.message);
      });
  };

  return (
    <nav
      className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}
    >
      <div
        className={
          showMenu
            ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]} `
            : `${styles["nav-wrapper"]}`
        }
        onClick={hideMenu}
      ></div>
      <ul onClick={hideMenu}>
        <li className={styles["logo-mobile"]}>
          <Logo />
          <FaTimes size={22} color="#fff" onClick={hideMenu} />
        </li>
        <li>
          <AdminOnlyLink>
            <Link to="/admin/home">
              <button className="--btn --btn-primary">Администрирование</button>
            </Link>
          </AdminOnlyLink>
        </li>
        <li>
          <NavLink to="/" className={activeLink}>
            Главная
          </NavLink>
        </li>
      </ul>
      <div className={styles["header-right"]} onClick={hideMenu}>
        <span className={styles.links}>
          <ShowLogout>
            <NavLink to="/login" className={activeLink}>
              Войти
            </NavLink>
          </ShowLogout>
          <ShowOnLogin>
            <a href="#home">
              <FaUserCircle size={16} className={styles.icon} />
              {displayName}
            </a>
          </ShowOnLogin>
          <ShowOnLogin>
            <NavLink to="/order-history" className={activeLink}>
              Заказы
            </NavLink>
          </ShowOnLogin>
        </span>
        <HeaderCart />
        <span className={styles.links}>
          <ShowOnLogin>
            <NavLink to="/" onClick={logOutUser}>
              Выйти
            </NavLink>
          </ShowOnLogin>
        </span>
      </div>
    </nav>
  );
};
