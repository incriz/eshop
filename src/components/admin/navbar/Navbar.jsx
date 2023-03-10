import React from "react";
import styles from "./navbar.module.scss";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUserName } from "../../../redux/slice/authSlice";
import { FaUserCircle } from "react-icons/fa";

export const Navbar = () => {
  const userName = useSelector(selectUserName);
  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              Все товары
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product/ADD" className={activeLink}>
              Добавить товар
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Заказы
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
