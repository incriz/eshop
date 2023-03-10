import * as ReactDOM from "react-dom";
import styles from "./loader.module.scss";
import spinner from "../../assets/spinner.gif";

export const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={spinner} alt="Загрузка..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};
