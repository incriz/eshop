import styles from "./footer.module.scss";

export const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return <div className={styles.footer}>&copy; {year} All Rights Reserved</div>;
};
