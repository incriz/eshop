import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db, storage } from "../../../firebase/config";
import { useSelector } from "react-redux";
import { selectProduct } from "../../../redux/slice/productSlice";
import { Card, Loader } from "../../../components";
import styles from "./addProducts.module.scss";
import { toast } from "react-toastify";

const categories = [
  { id: 1, name: "Ноутбук" },
  { id: 2, name: "Телефон" },
  { id: 3, name: "Системный блок" },
  { id: 4, name: "Аксессуары" },
];

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
};

export const AddProduct = () => {
  const { id } = useParams();
  const products = useSelector(selectProduct);
  const editProduct = products.find(item => item.id === id);

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, editProduct);
    return newState;
  });

  const [isLoading, setIsLoading] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0);

  const navigate = useNavigate();

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }

  const handleInputChange = e => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = e => {
    const file = e.target.files[0];
    // console.log(file);

    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      error => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Изоражение загружено");
        });
      }
    );
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: String(Timestamp.now().toDate()),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });

      navigate("/admin/all-products");

      toast.success("Товар добавлен");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editProductForm = async e => {
    e.preventDefault();
    setIsLoading(true);

    if (product.imageURL !== editProduct.imageURL) {
      const storageRef = ref(storage, editProduct.imageURL);
      await deleteObject(storageRef);
    }

    try {
      await setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: product.createdAt,
        editAt: String(Timestamp.now().toDate()),
      });

      setIsLoading(false);
      toast.success("Товар изменен");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h2>{detectForm(id, "Добавить товар", "Редактировать товар")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, handleSubmit, editProductForm)}>
            {/*NAME*/}
            <label>Наименование товара:</label>
            <input
              type="text"
              placeholder="Введите название"
              name="name"
              value={product.name}
              required
              onChange={e => handleInputChange(e)}
            />

            {/*IMAGE*/}
            <label>Изображение товара:</label>
            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Загрузка ${uploadProgress}`
                      : `Загрузка завершена ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                required
                onChange={e => handleImageChange(e)}
              />

              {product.imageURL === "" ? null : (
                <input
                  type="text"
                  placeholder="image URL"
                  //required
                  name="imageURL"
                  disabled
                  value={product.imageURL}
                />
              )}
            </Card>

            {/*PRICE*/}
            <label>Цена товара:</label>
            <input
              type="number"
              placeholder="Цена товара"
              name="price"
              value={product.price}
              required
              onChange={e => handleInputChange(e)}
            />

            {/*CATEGORY*/}
            <label>Категория:</label>
            <select
              required
              name="category"
              value={product.category}
              onChange={e => handleInputChange(e)}
            >
              <option value="" disabled>
                -- выбрать категорию --
              </option>

              {categories.map(cat => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>

            {/*COMPANY/BRAND*/}
            <label>Бренд товара:</label>
            <input
              type="text"
              placeholder="Введите название"
              name="brand"
              value={product.brand}
              required
              onChange={e => handleInputChange(e)}
            />

            {/*DESCRIPTION*/}
            <label>Описание:</label>
            <textarea
              name="desc"
              id=""
              cols="30"
              rows="10"
              value={product.desc}
              required
              onChange={e => handleInputChange(e)}
            ></textarea>

            <button className="--btn --btn-primary">
              {detectForm(id, "Сохранить", "Изменить")}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};
