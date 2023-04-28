import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../firebase/config";
import styles from "../auth.module.scss";
import loginImg from "../../../assets/login.png";
import { FaGoogle } from "react-icons/fa";
import { Card, Loader } from "../../../components";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectPriviousURL } from "../../../redux/slice/cartSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const previousURL = useSelector(selectPriviousURL);
  const navigate = useNavigate();

  const redirectUser = () => {
    if (previousURL.includes("cart")) {
      return navigate("/cart");
    }
    navigate("/");
  };

  const loginUser = e => {
    e.preventDefault();

    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // const user = userCredential.user;

        setIsLoading(false);
        toast.success("Добро пожаловать!");
        redirectUser();
      })
      .catch(error => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  const provider = new GoogleAuthProvider();
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        redirectUser();
      })
      .catch(error => {
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="400" />
        </div>

        <Card>
          <div className={styles.form}>
            <h2>Войти</h2>
            <form onSubmit={loginUser}>
              <input
                type="text"
                placeholder="Логин"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Пароль"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button className="--btn --btn-primary --btn-block" type="submit">
                Войти
              </button>
              <div className={styles.links}>
                <Link to="/reset">Восстановить пароль</Link>
              </div>
              <p>-- или --</p>
            </form>
            <button
              className="--btn --btn-danger --btn-block"
              onClick={loginWithGoogle}
            >
              <FaGoogle color="#fff" />
              login With Google
            </button>
            <span className={styles.register}>
              <p>У вас нет учетной записи? </p>
              <Link to="/register">Регистрация</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};
