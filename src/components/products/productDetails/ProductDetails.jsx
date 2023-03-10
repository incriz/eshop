import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import styles from "./productDetails.module.scss";
import Loader from "../../loader";

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      const obj = {
        id,
        ...docSnap.data(),
      };
      setProduct(obj);
    } else {
      toast.error("Продукты не найдены");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Информация о товаре</h2>
        <div>
          <Link to="#/products">
            <button className="--btn --btn-primary">&larr; Назад</button>
          </Link>
        </div>
        {product === null ? (
          <Loader />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{`${product.price}₽`}</p>
                <p>{product.desc}</p>
                <p>
                  <b>Артикул: </b>
                  {product.id}
                </p>
                <p>
                  <b>Бренд: </b>
                  {product.brand}
                </p>
                <div className={styles.count}>
                  <button className="--btn">-</button>
                  <p>
                    <b>1</b>
                  </p>
                  <button className="--btn">+</button>
                </div>
                <button className="--btn --btn-danger">Добавить</button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
