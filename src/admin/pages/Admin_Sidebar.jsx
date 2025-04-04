import React from "react";
import { FaUserFriends, FaCartPlus, FaCubes, FaClipboardList, FaChartBar } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl p-6 flex flex-col justify-between">
      <div>
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-lg font-bold text-gray-900">Admin Portal</h1>
          <p className="text-sm text-gray-500">System Administrator</p>
        </div>
        <hr className="mb-4" />

        <ul className="text-gray-800">
          
          <SidebarItem Icon={FaChartBar} text="Dashboard" onClick={() => navigate('/dashboard')} />
          <SidebarItem Icon={FaUserFriends} text="User Management" onClick={() => navigate('/User_Manage')} />
          <SidebarItem Icon={FaCartPlus} text="Seller Management" onClick={() => navigate('/Seller_Manage')} />
          <SidebarItem Icon={FaCubes} text="Product Catalog" />
          <SidebarItem Icon={FaClipboardList} text="Order Management"  />
        </ul>
      </div>
      <div>
        <SidebarItem Icon={IoLogOut} text="Logout" customClass="text-red-600 hover:bg-red-500" onClick={() => navigate('/logout')} />
      </div>
    </div>
  );
};

const SidebarItem = ({ Icon, text, onClick, customClass = "" }) => {
  return (
    <li onClick={onClick} className={`mb-3 px-4 py-3 flex items-center rounded-lg cursor-pointer transition-all hover:bg-blue-500 hover:text-white ${customClass}`}>
      <Icon className="mr-3" size={20} /> {text}
    </li>
  );
};

export default AdminSidebar;
