import * as ReactDOM from "react-dom";
import styles from "./loader.module.scss";
import loaderImg from "../../assets/loader.gif";

export const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loaderImg} alt="Загрузка..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};
