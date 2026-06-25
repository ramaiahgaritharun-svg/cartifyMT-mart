import { useEffect, useState } from "react";
import api from "../../services/api";
import { getImage } from "../../utils/imageHelper";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);

  // FETCH CART
  const fetchCart = () => {
    api.get("cart/list/")
      .then((res) => {
        console.log("CART RESPONSE:", res.data);

        //  NORMALIZATION
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.results || res.data?.cart || [];

        setCart(data);
      })
      .catch((err) => {
        console.log("Cart error:", err);
        setCart([]);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  //  INCREASE PRODUCT QUANTITY
  const increaseQty = (id) => {
    api.post("cart/update-quantity/", {
      cart_id: id,
      action: "increase",
    })
      .then(fetchCart)
      .catch(console.log);
  };

  //  DECREASE PRODUCT QUANTITY
  const decreaseQty = (id) => {
    api.post("cart/update-quantity/", {
      cart_id: id,
      action: "decrease",
    })
      .then(fetchCart)
      .catch(console.log);
  };

  //  REMOVE ITEM FROM CART
  const removeItem = (id) => {
    api.delete(`cart/delete/${id}/`)
      .then(fetchCart)
      .catch(console.log);
  };

  // TOTAL PRICE BASED ON CART ITEMS
  const totalPrice = (Array.isArray(cart) ? cart : []).reduce(
    (acc, item) =>
      acc + (item.quantity * (item.product_detail?.price || 0)),
    0
  );

  const navigate = useNavigate();

  return (
    <div className="cart-container">

      <h1>Your Cart 🛒</h1>

      {/* EMPTY STATE */}
      {Array.isArray(cart) && cart.length === 0 ? (
        <p>Cart is empty 😢</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">

              <img
                src={getImage(item.product_detail?.image)}
                alt={item.product_detail?.name}
                width="100"
              />
              <div>

                <h3>
                  {item.product_detail?.name || "No Name"}
                </h3>

                <p>
                  ₹{item.product_detail?.price || 0}
                </p>

                {/* QUANTITY CONTROLS */}
                <div>
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>

                {/* REMOVE */}
                <button onClick={() => removeItem(item.id)}>
                  Remove
                </button>

              </div>

            </div>
          ))}

          {/* TOTAL */}
          <div className="cart-total">
            <h2>Total: ₹{totalPrice}</h2>
            <button onClick={() => navigate("/checkout")}>
              Checkout
            </button>
          </div>
        </>
      )}

    </div>
  );
}

export default Cart;