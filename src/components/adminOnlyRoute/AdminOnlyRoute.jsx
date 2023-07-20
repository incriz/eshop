import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/slice/authSlice";

export const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "rudyakov.anatoly@gmail.com") {
    return children;
  }

  return (
    <section style={{ height: "80vh" }}>
      <div className="container">
        <h2>Доступ запрещен!</h2>
        <p>Эту страницу может просматривать только администратор.</p>
        <br />
        <Link to="/">
          <button className="--btn">&larr; На главную</button>
        </Link>
      </div>
    </section>
  );
};
