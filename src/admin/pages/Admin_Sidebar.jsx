import React from 'react'
import {FaHome, FaUserFriends, FaCartPlus,FaCubes, FaClipboardList } from 'react-icons/fa'
import { IoLogOut } from "react-icons/io5";

const Admin_Sidebar = () => {
  return (
    <div className='w-64 bg-beige-300 shadow-2xl fixed h-125 px-4 ml-2 mt-12 rounded-lg py-2' rounded>
        <div className="my-2 mb-4">
            <h1 className='text-xl font-semibold'>Admin Portal</h1>
        </div>
        <hr className='shadow-md ' />
        <ul className='mt-3 font-semibold text-black'>
            <li className="mb-3 rounded hover:shadow hover:bg-blue-500   py-2 ">
                <a className='px-3'>
                <FaHome className=' inline-block w-6 h-6 mr-2 -mt-2' />
                Home
                </a>
                </li>
            <li className="mb-3 rounded hover:shadow hover:bg-blue-500 py-2 ">
                <a className='px-3'>
                <FaUserFriends  className=' inline-block w-6 h-6 mr-2 -mt-2' />
                User Management
                </a>
                </li>
            <li className="mb-3 rounded hover:shadow hover:bg-blue-500 py-2 ">
                <a className='px-3'>
                <FaCartPlus className='inline-block w-6 h-6 mr-2 -mt-2' />
                Seller Management
                </a>
                </li>
            <li className="mb-3 rounded hover:shadow hover:bg-blue-500 py-2 ">
                <a className='px-3'>
                <FaCubes className='inline-block w-6 h-6 mr-2 -mt-2' />
                Product Catalog
                </a>
                </li>
            <li className="mb-3 rounded hover:shadow hover:bg-blue-500 py-2 ">
                <a className='px-3'>
                <FaClipboardList  className='inline-block w-6 h-6 mr-2 -mt-2' />
                Order Management
                </a>
                </li>
            <li className="mb-3 rounded hover:shadow hover:bg-blue-500 py-2 ">
                <a className='px-3'>
                <IoLogOut className='inline-block w-6 h-6 mr-2 -mt-2' />
                Logout
                </a>
                </li>
        </ul>
    
    
    </div>
  )
}

export default Admin_Sidebar
