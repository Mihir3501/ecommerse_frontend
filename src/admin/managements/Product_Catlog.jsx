import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Admin_Sidebar from "../pages/Admin_Sidebar";
import Admin_Navbar from "../pages/Admin_Navbar";

const Product_Catalog = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://192.168.1.16:5000/api/admin/product-list');
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 fixed h-full bg-white shadow z-10">
        <Admin_Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <div className="sticky top-0 z-20 bg-white shadow">
          <Admin_Navbar />
        </div>

        <div className="p-6 pt-24">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Product Catalog</h2>
            <div className="flex gap-3">
              <button
                className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-100"
                onClick={() => navigate('/sellers')}
              >
                See All Sellers
              </button>
              <button
                className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-100"
                onClick={() => navigate('/products')}
              >
                See All Products
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 font-semibold">Product</th>
                  <th className="px-6 py-3 font-semibold">Category</th>
                  <th className="px-6 py-3 font-semibold">Price</th>
                  <th className="px-6 py-3 font-semibold">Stock</th>
                  <th className="px-6 py-3 font-semibold">Seller</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/product/${product._id}`)}
                        className="text-blue-600 hover:underline"
                      >
                        {product.name}
                      </button>
                    </td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">₹{product.price}</td>
                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          navigate(`/seller/${product.seller?._id}`)
                        }
                        className="text-blue-600 hover:underline"
                      >
                        {product.seller?.name || 'N/A'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product_Catalog;
