import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../redux/adminSlice"; // Thunk action from adminSlice

const Admin_Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Corrected reducer key to match your Redux store setup
  const { loading, error, isAuthenticated } = useSelector((state) => state.admin);

  useEffect(() => {
    // console.log(state.auth, "login:")
    if (isAuthenticated) {
      navigate("/Admin");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginAdmin({ email, password })); // ✅ calls the async thunk
  };

  return (
    <div className="flex min-h-screen bg-green-400 items-center justify-center p-4">
      <div className="flex flex-col md:flex-row w-full max-w-3xl bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-2xl font-bold text-green-700">Welcome</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Please login to your account by filling in this form:
          </p>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <form className="mt-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-700 text-sm">Email Address</label>
              <input
                type="email"
                placeholder="coolname@name.com"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-3">
              <label className="block text-gray-700 text-sm">Password</label>
              <input
                type="password"
                placeholder="********"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-4 flex gap-3">
              <button
                type="submit"
                className="w-full bg-green-700 text-white p-2 rounded-md shadow-md hover:bg-green-800 text-sm"
                disabled={loading}
              >
                {loading ? "Logging in..." : "LOGIN"}
              </button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/2 h-56 md:h-auto bg-cover bg-center">
          <img
            src="/login_side.jpg"
            className="w-full h-full object-cover"
            alt="Login Side"
          />
        </div>
      </div>
    </div>
  );
};

export default Admin_Login;
