import {Link} from "react-router-dom";
import {Card, Loader} from "../../../components";
import {useState} from "react";
import {sendPasswordResetEmail} from "firebase/auth";
import {auth} from "../../../firebase/config";
import resetImg from "../../../assets/forgot.png";
import styles from "../auth.module.scss";
import {toast} from "react-toastify";

export const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = e => {
    e.preventDefault();

    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success("check your email");
      })
      .catch(error => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={resetImg} alt="Reset password" width="400" />
        </div>

        <Card>
          <div className={styles.form}>
            <h2>RESET PASSWORD</h2>
            <form onSubmit={resetPassword}>
              <input
                type="text"
                placeholder="login"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button className="--btn --btn-primary --btn-block" type="submit">
                Reset password
              </button>
              <div className={styles.links}>
                <p>
                  <Link to="/eshop/login">- Login</Link>
                </p>{" "}
                <p>
                  <Link to="/eshop/register">- Register</Link>
                </p>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};
