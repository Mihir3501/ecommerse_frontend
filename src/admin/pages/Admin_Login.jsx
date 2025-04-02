import React from "react";

const Admin_Login = () => {
  
  return (
    <div className="flex min-h-screen bg-green-400 items-center justify-center p-4">
    <div className="flex flex-col md:flex-row w-full max-w-3xl bg-white rounded-lg overflow-hidden shadow-lg">

      <div className="w-full md:w-1/2 p-6">
        <h1 className="text-2xl font-bold text-green-700">Welcome Back</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Please login to your account by filling in this form:
        </p>
        <form className="mt-4">
          <div>
            <label className="block text-gray-700 text-sm">Email Address</label>
            <input
              type="email"
              placeholder="coolname@name.com"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 text-sm"
            />
          </div>
          <div className="mt-3">
            <label className="block text-gray-700 text-sm">Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 text-sm"
            />
          </div>
          <div className="flex items-center justify-between mt-3 text-sm">
            <div>
              <input type="checkbox" id="remember" className="mr-1" />
              <label htmlFor="remember" className="text-gray-600">Remember me</label>
            </div>
            <a href="#" className="text-green-600 hover:underline">Forgot password?</a>
          </div>
          <div className="mt-4 flex gap-3">
            <button className="w-full bg-green-700 text-white p-2 rounded-md shadow-md hover:bg-green-800 text-sm">LOGIN</button>
          </div>
        </form>
      </div>

        <div className="w-full md:w-1/2 h-56 md:h-auto bg-cover bg-center" >
        <img src="/login_side.jpg" className=" w-full h-full object-cover " />
          
        </div>
      </div>
    </div>
  );
};

export default Admin_Login;