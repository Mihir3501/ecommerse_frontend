import React, { useState } from "react";
import { FaSearch, FaTrash, FaEdit } from "react-icons/fa";

const Seller_Manage = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", password: "password123", orders: 5, orderStatus: "Completed" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", password: "pass456", orders: 3, orderStatus: "Pending" }
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Seller Management</h1>
      <div className="mb-4 flex items-center bg-white p-2 rounded-md shadow">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search users by name..."
          className="w-full outline-none"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Password</th>
              <th className="p-3">Products</th>
              <th className="p-3">Order Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.password}</td>
                  <td className="p-3">{user.orders}</td>
                  <td className="p-3">{user.orderStatus}</td>
                  <td className="p-3 flex gap-3">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Seller_Manage;  