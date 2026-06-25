import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/admin.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    category: "",
    image: null,
  });

  // ================= FETCH PRODUCTS =================
  const fetchProducts = () => {
    api
      .get("products/")
      .then((res) => {
        const data = res.data;
        setProducts(Array.isArray(data) ? data : data?.results || []);
      })
      .catch((err) => console.log(err));
  };

  // ================= FETCH CATEGORIES =================
  const fetchCategories = () => {
    api
      .get("products/categories/")
      .then((res) => {
        const data = res.data;
        setCategories(Array.isArray(data) ? data : data?.results || []);
      })
      .catch((err) => console.log("Category error:", err));
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= ADD PRODUCT =================
  const addProduct = () => {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("description", form.description);
    formData.append("category", form.category);

    if (form.image) {
      formData.append("image", form.image);
    }

    api
      .post("products/add/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Product Added 🚀");

        setForm({
          name: "",
          price: "",
          description: "",
          stock: "",
          category: "",
          image: null,
        });

        fetchProducts();
      })
      .catch((err) => {
        console.log(err.response?.data);
      });
  };

  // ================= DELETE PRODUCT =================
  const deleteProduct = (id) => {
    api
      .delete(`products/delete/${id}/`)
      .then(() => {
        alert("Product Deleted ❌");
        fetchProducts();
      })
      .catch((err) => console.log(err.response?.data));
  };

  return (
    <div className="admin-container">

      <h1>Admin Product Panel 🛍️</h1>

      {/* ================= PRODUCT FORM ================= */}
      <div className="admin-form">

        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
        />

        {/* CATEGORY SELECT (FROM BACKEND) */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* IMAGE */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({
              ...form,
              image: e.target.files[0],
            })
          }
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <button onClick={addProduct}>
          Add Product
        </button>

      </div>

      <hr />

      {/* ================= PRODUCT LIST ================= */}
      <div className="product-list">

        {products.map((product) => (
          <div key={product.id} className="product-card">

            {product.image && (
              <img
                src={
                  product.image.startsWith("http")
                    ? product.image
                    : `http://127.0.0.1:8000${product.image}`
                }
                alt={product.name}
                width="120"
              />
            )}

            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <p>{product.description}</p>
            <p>Stock: {product.stock}</p>

            <button
              className="delete-btn"
              onClick={() => deleteProduct(product.id)}
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default AdminProducts;