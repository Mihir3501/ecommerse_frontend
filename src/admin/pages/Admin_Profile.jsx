import React, { useState } from "react";
import { useSelector } from "react-redux";
import Admin_Sidebar from "../pages/Admin_Sidebar";
import Admin_Navbar from "../pages/Admin_Navbar";

const Admin_Profile = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const token = useSelector((state) => state.admin.adminInfo?.token);
  const adminName = useSelector((state) => state.admin.adminInfo?.name) || "Admin Mihir";

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    if (!token) {
      setMessage("Authentication token not found. Please login again.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/admin/profile/change-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to connect to the server.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 fixed h-full bg-white shadow z-10">
        <Admin_Sidebar />
      </div>

      {/* Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Navbar */}
        <div className="sticky top-0 z-20 bg-white shadow">
          <Admin_Navbar />
        </div>

        {/* Main section */}
        <div className="p-8 pt-24 overflow-y-auto">
          <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Profile</h2>

            <p className="text-gray-600 mb-6">
              <span className="font-semibold">Name:</span> {adminName}
            </p>

            <hr className="mb-6" />

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h3>

            {message && (
              <div className="mb-4 p-3 rounded-lg bg-blue-100 text-blue-800 text-sm">
                {message}
              </div>
            )}

            <form onSubmit={handleChangePassword}>
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Profile;
