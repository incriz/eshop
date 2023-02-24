import { useState } from "react";
import styles from "./addProducts.module.scss";
import { Card } from "../../../components";

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

export const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    imageURL: "",
    price: "",
    category: "",
    brand: "",
    desc: "",
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = e => {};

  const handleSubmit = e => {
    e.preventDefault();
    console.log(product);
  };

  return (
    <div className={styles.product}>
      <h1>AddProducts</h1>
      <Card cardClass={styles.card}>
        <form onSubmit={handleSubmit}>
          {/*NAME*/}
          <label>Product name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={product.name}
            required
            onChange={e => handleInputChange(e)}
          />

          {/*IMAGE*/}
          <label>Product image:</label>
          <Card cardClass={styles.group}>
            <div className={styles.progress}>
              <div className={styles["progress-bar"]} style={{ width: "50%" }}>
                Uploading 50%
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              placeholder="Product Image"
              onChange={e => handleImageChange(e)}
            />
            <input
              type="text"
              //required
              name="imageURL"
              disabled
              value={product.imageURL}
            />
          </Card>

          {/*PRICE*/}
          <label>Product Price:</label>
          <input
            type="number"
            placeholder="Product price"
            name="price"
            value={product.price}
            required
            onChange={e => handleInputChange(e)}
          />

          {/*CATEGORY*/}
          <label>Product Category:</label>
          <select
            required
            name="category"
            value={product.category}
            onChange={e => handleInputChange(e)}
          >
            <option value="" disabled>
              -- choose product category --
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
          <label>Product Company/Brand:</label>
          <input
            type="text"
            placeholder="Product brand"
            name="brand"
            value={product.brand}
            required
            onChange={e => handleInputChange(e)}
          />

          {/*DESCRIPTION*/}
          <label>Product Description:</label>
          <textarea
            name="desc"
            id=""
            cols="30"
            rows="10"
            value={product.desc}
            required
            onChange={e => handleInputChange(e)}
          ></textarea>

          <button className="--btn --btn-primary">Save Product</button>
        </form>
      </Card>
    </div>
  );
};
