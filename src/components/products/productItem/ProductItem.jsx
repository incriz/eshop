import React from "react";
import { Link } from "react-router-dom";
import styles from "./productItem.module.scss";
import Card from "../../card";

export const ProductItem = ({
  product,
  grid,
  id,
  name,
  price,
  desc,
  imageURL,
}) => {
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortedText = text.substring(0, n).concat("...");
      return shortedText;
    }
    return text;
  };

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${id}`}>
        <div className={styles.img}>
          <img src={imageURL} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>{`${price}₽`}</p>
          <h4>{!grid ? name : shortenText(name, 18)}</h4>
        </div>
        {!grid && <p>{shortenText(desc, 100)}</p>}
        <button className="--btn --btn-danger">Добавить товар</button>
      </div>
    </Card>
  );
};
