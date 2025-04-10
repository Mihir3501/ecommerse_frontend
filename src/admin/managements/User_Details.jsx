// src/components/admin/UserDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Admin_Sidebar from "../pages/Admin_Sidebar";
import Admin_Navbar from "../pages/Admin_Navbar";
import { useSelector } from "react-redux";

const User_Details = () => {
  const { id } = useParams(); // Get user ID from URL
  const { adminInfo } = useSelector((state) => state.admin);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`http://192.168.1.29:5000/api/admin/allUsers/${id}`, {
          headers: {
            Authorization: `Bearer ${adminInfo?.token}`,
          },
        });
        setUser(res.data.user); // Adjust according to your API response
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (adminInfo?.token) {
      fetchUserDetails();
    }
  }, [id, adminInfo]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 fixed h-full bg-white shadow z-10">
        <Admin_Sidebar />
      </div>

      <div className="flex-1 ml-64">
        <div className="sticky top-0 z-20 bg-white shadow">
          <Admin_Navbar />
        </div>

        <div className="p-6 pt-24">
          <h1 className="text-2xl font-bold mb-4">User Details</h1>
          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <div className="bg-white p-6 shadow rounded-lg space-y-4">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Status:</strong> {user.isActive ? "Active" : "Inactive"}</p>
              <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
              {/* Add more fields as needed */}
            </div>
          ) : (
            <p className="text-red-500">User not found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default User_Details;
