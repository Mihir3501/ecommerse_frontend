import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Selar_Navbar from '../dashboard/Selar_Navbar';
import Selar_Sidebar from '../dashboard/Selar_Sidebar';

const Order = () => {
  const token = useSelector((state) => state.seller.sellerInfo?.token);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setError("Unauthorized: Token missing. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`${BASE_URL}/api/seller/allOrders`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setOrders(data.orders || []);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 fixed h-full bg-white shadow z-10">
        <Selar_Sidebar />
      </div>

      <div className="flex-1 ml-64">
        <div className="sticky top-0 z-10 bg-white shadow">
          <Selar_Navbar />
        </div>

        <div className="p-4 pt-24">
          <h1 className="text-2xl font-bold mb-4">Seller Orders</h1>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2">Order ID</th>
                    <th className="border px-4 py-2">Buyer</th>
                    <th className="border px-4 py-2">Products</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="border px-4 py-2">{order._id}</td>
                      <td className="border px-4 py-2">{order.buyer?.user || "N/A"}</td>
                      <td className="border px-4 py-2">
                        <ul>
                          {order.items?.map((item) => (
                            <li key={item._id}>
                              {item.product?.title || "Product"} (x{item.quantity})
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="border px-4 py-2">
                        {order.items?.[0]?.status || "Pending"}
                      </td>
                      <td className="border px-4 py-2">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                          Update Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
