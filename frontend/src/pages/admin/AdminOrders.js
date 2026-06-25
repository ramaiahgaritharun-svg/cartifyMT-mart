import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/admin.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    api.get("orders/admin/all/")
      .then((res) => {
        setOrders(res.data.results || res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = (id, status) => {
    api.patch(`orders/update/${id}/`, {
      status: status,
    })
      .then(() => {
        alert("Status Updated");
        fetchOrders();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="admin-container">

      <h1>Manage Orders 📦</h1>

      {orders.map((order) => (
        <div
          className="order-card"
          key={order.id}
        >
          <h3>
            {order.product_detail?.name}
          </h3>

          <p>
            Quantity: {order.quantity}
          </p>

          <p>
            Total: ₹{order.total_price}
          </p>

          <p>
            Status:
            <strong>
              {" "}
              {order.status}
            </strong>
          </p>

          <select
            value={order.status}
            onChange={(e) =>
              updateStatus(
                order.id,
                e.target.value
              )
            }
          >
            <option value="pending">
              Pending
            </option>

            <option value="paid">
              Paid
            </option>

            <option value="shipped">
              Shipped
            </option>

            <option value="delivered">
              Delivered
            </option>

            <option value="cancelled">
              Cancelled
            </option>

          </select>

        </div>
      ))}

    </div>
  );
}

export default AdminOrders;