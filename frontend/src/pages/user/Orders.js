import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/user.css";
import { getImage } from "../../utils/imageHelper";

function Orders() {
  const [orders, setOrders] = useState([]);

  // FETCH ORDERS
  const fetchOrders = async () => {
  try {
    const res = await api.get("orders/list/");

    console.log("Orders:", res.data);

    if (Array.isArray(res.data)) {
      setOrders(res.data);
    } else if (Array.isArray(res.data.results)) {
      setOrders(res.data.results);
    } else {
      setOrders([]);
    }
  } catch (err) {
    console.log(err);
    setOrders([]);
  }
};

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">

      <h2>Your Orders 📦</h2>

      {orders.length === 0 ? (
        <p>No orders found 😢</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order.id}>

            <img
              src={getImage(order.product_detail?.image)}
              alt={order.product_detail?.name}
            />

            <div className="order-info">

              <h3>{order.product_detail?.name}</h3>

              <p>Price: ₹{order.product_detail?.price}</p>

              <p>Quantity: {order.quantity}</p>

              <p>
                Total: ₹
                {order.total_price ||
                  order.quantity * order.product_detail?.price}
              </p>

              <p className={`status ${order.status}`}>
                Status: {order.status}
              </p>

              <p>Payment: {order.payment_method}</p>

            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default Orders;