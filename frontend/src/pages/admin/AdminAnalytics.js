import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/admin.css";

function AdminAnalytics() {
  const [data, setData] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchAnalytics = () => {
    setLoading(true);

    api.get("admin/analytics/")
      .then((res) => {
        setData({
          users: res.data?.users || 0,
          products: res.data?.products || 0,
          orders: res.data?.orders || 0,
          revenue: res.data?.revenue || 0,
           delivered: res.data.delivered || 0,
           cancelled: res.data.cancelled || 0,
        });
      })
      .catch((err) => {
        console.log("Analytics error:", err);

        setData({
          users: 0,
          products: 0,
          orders: 0,
          revenue: 0,
          delivered: 0,
          cancelled: 0,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="admin-container">

      <h1>Admin Analytics 📊</h1>

      {loading ? (
        <p>Loading analytics...</p>
      ) : (
        <div className="dashboard-grid">

          {/* USERS */}
          <div className="card">
            <h2>{data.users}</h2>
            <p>Total Users</p>
          </div>

          {/* PRODUCTS */}
          <div className="card">
            <h2>{data.products}</h2>
            <p>Total Products</p>
          </div>

          {/* ORDERS */}
          <div className="card">
            <h2>{data.orders}</h2>
            <p>Total Orders</p>
          </div>

          {/* REVENUE */}
          <div className="card">
            <h2>₹{data.revenue}</h2>
            <p>Total Revenue</p>
          </div>

          <div className="card">
            <h2>{data.delivered}</h2>
            <p>Delivered Orders</p>
          </div>

          <div className="card">
            <h2>{data.cancelled}</h2>
            <p>Cancelled Orders</p>
          </div>

        </div>
      )}

    </div>
  );
}

export default AdminAnalytics;