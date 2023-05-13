import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Card, Loader } from "../../../components";
import { Link, useNavigate } from "react-router-dom";
import styles from "../auth.module.scss";
import registerImg from "../../../assets/register.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../../firebase/config";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = e => {
    e.preventDefault();
    if (password !== cPassword) {
      return toast.error("Пароли не совпадают!");
    }
    if (password.length < 5) {
      toast.error("Пароль должен быть боль 5 симвлов!");
    }

    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false);
        toast.success("Регистрация прошла успешно!");
        navigate("/login");
      })
      .catch(error => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      <ToastContainer />
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Регистрация</h2>
            <form onSubmit={registerUser}>
              <input
                type="email"
                placeholder="введите почту"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="введите пароль"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="подтвердите пароль"
                required
                value={cPassword}
                onChange={e => setCPassword(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Регистрация
              </button>
            </form>
            <span className={styles.register}>
              <p>У вас есть аккаунт?</p>
              <Link to="/login" style={{ color: "red" }}>
                Войти
              </Link>
            </span>
          </div>
        </Card>

        <div className={styles.img}>
          <img src={registerImg} alt="Register" width="400" />
        </div>
      </section>
    </>
  );
};
