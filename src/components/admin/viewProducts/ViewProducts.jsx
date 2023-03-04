import React, { useEffect } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../../../firebase/config";
import { Link } from "react-router-dom";
import { Loader } from "../../../components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { UseFetchCollection } from "../../../customHooks/UseFetchCollection";
import {
  selectProduct,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import Notiflix from "notiflix";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import styles from "./viewProducts.module.scss";

export const ViewProducts = () => {
  const { data, isLoading } = UseFetchCollection("products");

  const products = useSelector(selectProduct);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Удаление товара!",
      "Вы дейститильно хотите удалить этот товар?",
      "Удалить",
      "Отмена",
      async function okCb() {
        await deleteProduct(id, imageURL);
      },
      function cancelCb() {},
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));

      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);

      toast.success("Продукт удален!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>Товары</h2>

        {products.length === 0 ? (
          <p>Товар не найден</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th>Изображение</th>
                <th>Наименование</th>
                <th>Категория</th>
                <th>Цена</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => {
                const { id, name, imageURL, price, category } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`${price}₽`}</td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
