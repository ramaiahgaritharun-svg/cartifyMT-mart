import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import "../../styles/user.css";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment_method: "cod",
  });

  // 🛒 FETCH CART
  const fetchCart = async () => {
    try {
      const res = await api.get("cart/list/");

      console.log("Checkout Cart Response:", res.data);

      if (Array.isArray(res.data)) {
        setCart(res.data);
      } else if (Array.isArray(res.data.results)) {
        setCart(res.data.results);
      } else {
        setCart([]);
      }
    } catch (err) {
      console.log("Cart Fetch Error:", err);
      setCart([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // FORM CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // TOTAL PRICE
  const total = cart.reduce(
    (sum, item) =>
      sum +
      item.quantity *
        Number(item.product_detail?.price || 0),
    0
  );

  // PLACE ORDER
  const placeOrder = async () => {
    try {
      if (cart.length === 0) {
        alert("Cart is empty ❌");
        return;
      }

      if (
        !form.full_name ||
        !form.phone ||
        !form.address ||
        !form.city ||
        !form.state ||
        !form.pincode
      ) {
        alert("Please fill all shipping details");
        return;
      }

      await api.post("orders/place/", form);

      alert("Order placed successfully 🎉");

      navigate("/orders");
    } catch (err) {
      console.log("Place Order Error:", err);

      if (err.response?.data) {
        console.log(err.response.data);
      }

      alert("Order failed ❌");
    }
  };

  return (
    <div className="checkout-container">

      <h2>Checkout 🧾</h2>

      {/* SHIPPING FORM */}
      <div className="checkout-form">

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
        />

        <select
          name="payment_method"
          value={form.payment_method}
          onChange={handleChange}
        >
          <option value="cod">
            Cash On Delivery
          </option>

          <option value="upi">
            UPI
          </option>

          <option value="card">
            Card
          </option>
        </select>

      </div>

      {/* ORDER SUMMARY */}
      <div className="summary">

        <h3>Order Summary</h3>

        {cart.length === 0 ? (
          <p>Your cart is empty 😢</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="summary-item"
              >
                <p>
                  <strong>
                    {item.product_detail?.name}
                  </strong>
                </p>

                <p>
                  ₹{item.product_detail?.price}
                  {" × "}
                  {item.quantity}
                </p>
              </div>
            ))}

            <h2>
              Total: ₹{total.toFixed(2)}
            </h2>
          </>
        )}

      </div>

      {/* PLACE ORDER */}
      <button
        className="place-btn"
        onClick={placeOrder}
      >
        Place Order
      </button>

    </div>
  );
}

export default Checkout;