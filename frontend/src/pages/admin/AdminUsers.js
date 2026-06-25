import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/admin.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  // FETCH USERS
  const fetchUsers = () => {
    api
      .get("admin/users/")
      .then((res) => {
        setUsers(res.data.results || res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-container">

      <h1>Manage Users 👥</h1>

      {users.length === 0 ? (
        <h3>No users found</h3>
      ) : (
        users.map((user) => (
          <div key={user.id} className="user-card">

            <div>

              <h3>{user.username}</h3>
              <p>Email: {user.email}</p>

              <p>
                Role:{" "}
                <b>
                  {user.role === "admin"
                    ? "Admin"
                    : "Customer"}
                </b>
              </p>

            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default AdminUsers;