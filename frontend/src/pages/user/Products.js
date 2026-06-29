import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/user.css";
import { getImage } from "../../utils/imageHelper";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(false);

  //  FETCH PRODUCTS 
  const fetchProducts = () => {
    api
      .get("products/")
      .then((res) => {
        setProducts(Array.isArray(res.data) ? res.data : res.data?.results || []);
      })
      .catch((err) => {
        console.log("Product error:", err);
        setProducts([]);
      });
  };

  //  FETCH CATEGORIES 
  const fetchCategories = () => {
    api
      .get("products/categories/")
      .then((res) => {
        setCategories(Array.isArray(res.data) ? res.data : res.data?.results || []);
      })
      .catch((err) => console.log("Category error:", err));
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  //  SEARCH PRODUCTS
  const searchProducts = () => {
    api
      .get(`products/search/?q=${search}&category=${selectedCategory}`)
      .then((res) => {
        setProducts(Array.isArray(res.data) ? res.data : res.data?.results || []);
      })
      .catch((err) => console.log(err));
  };

  const openProduct = (id) => {
    setLoadingProduct(true);

    api
      .get(`products/products/${id}/`)
      .then((res) => {
        setSelectedProduct(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingProduct(false));
  };

  const closeDetails = () => {
    setSelectedProduct(null);
  };

  //  ADD TO CART 
  const addToCart = (id) => {
    api
      .post("cart/add/", {
        product: id,
        quantity: 1,
      })
      .then(() => alert("Added to cart 🛒"))
      .catch(() => alert("Login required ❌"));
  };

  return (
    <div className="products-page">

      <h1 className="products-title">Products 🛍️</h1>

      {/*SEARCH PRODUCTS */}
      <div className="search-filter">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <button onClick={searchProducts}>
          Search
        </button>

      </div>

      {/*  PRODUCT LIST  */}
      {selectedProduct ? (
        <div className="product-details">

          <button onClick={closeDetails}>
            ← Back
          </button>

          {loadingProduct ? (
            <p>Loading...</p>
          ) : (
            <div className="product-details-card">

              <img
                src={getImage(selectedProduct.image)}
                alt={selectedProduct.name}
                className="details-image"
              />

              <h1>{selectedProduct.name}</h1>

              <h2>₹{selectedProduct.price}</h2>

              <p>{selectedProduct.description}</p>

              <button
                onClick={() => addToCart(selectedProduct.id)}
              >
                Add to Cart 🛒
              </button>

            </div>
          )}

        </div>
      ) : (
   
        <>
          {products.length === 0 ? (
            <p>No products found ❌</p>
          ) : (
            <div className="products-grid">

              {products.map((product) => (
                <div
                  key={product.id}
                  className="product-card"
                >

                  <img
                    src={getImage(product.image)}
                    alt={product.name}
                    className="product-image"
                  />

                  <h3>{product.name}</h3>

                  <p>₹{product.price}</p>

                  <p>{product.description}</p>

                  <button onClick={() => addToCart(product.id)}>
                    Add to Cart
                  </button>

                  <button onClick={() => openProduct(product.id)}>
                    View Product
                  </button>

                </div>
              ))}

            </div>
          )}
        </>
      )}

    </div>
  );
}

export default Products;