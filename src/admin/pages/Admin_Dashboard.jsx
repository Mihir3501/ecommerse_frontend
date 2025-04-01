import React from "react";
import Admin_Sidebar from "./Admin_Sidebar";
import Admin_Navbar from "./Admin_Navbar";

const Admin_Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">

      <Admin_Sidebar />


      <div className="flex-1 flex flex-col ml-64">
        <Admin_Navbar />

        <div className="flex-1 p-6 mt-15">

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl shadow-md">
            <h1 className="text-3xl font-bold">Welcome to Admin Dashboard</h1>
            <p className="mt-2 text-lg">
              Manage your e-commerce platform with comprehensive tools and insights.
            </p>
            <div className="mt-4">
              <button className="bg-white cursor-pointer text-blue-600 font-semibold px-4 py-2 rounded-lg shadow-md mr-2">
                View System Status
              </button>
              <button className="bg-blue-800 cursor-pointer hover:bg-blue-900 text-white font-semibold px-4 py-2 rounded-lg shadow-md">
                Generate Reports
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <StatCard title="Total Users" value="8,549" change="+124 this month" />
            <StatCard title="Total Sellers" value="347" change="+18 this month" />
            <StatCard title="Total Products" value="24,832" change="+342 this month" />
            <StatCard title="Total Revenue" value="$284,521" change="+8.3% from last month" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-gray-600 text-lg font-semibold">{title}</h2>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-green-600 font-medium mt-1">&#x2B06; {change}</p>
    </div>
  );
};

export default Admin_Dashboard;
