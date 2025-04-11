import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Selar_Sidebar from "../dashboard/Selar_Sidebar";
import Selar_Navbar from "../dashboard/Selar_Navbar";
import { FaEdit, FaEye, FaPlus } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";

const Selar_Products = () => {
  const { sellers } = JSON.parse(localStorage.getItem("sellerAuth"));

  console.log(sellers, ":adminInfo");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef();

  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    subcategories: "",
  });
  const [image, setImage] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.29:5000/api/seller/add-product",
        {
          headers: {
            Authorization: `Bearer ${sellers?.token}`,
          },
        }
      );
      setProducts(response?.data?.sellers ?? []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sellers?.token) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [sellers]);

  // Handle file/image upload separately (for quick upload)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.post(
        "http://192.168.1.29:5000/api/seller/upload-product-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${sellers?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Image uploaded successfully!");
      fetchProducts();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload image.");
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle new product form submit
  const handleProductSubmit = async (e) => {
    e.preventDefault();

    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("stock", newProduct.stock);
    formData.append("category", newProduct.category);
    formData.append("subcategories", newProduct.subcategories);
    formData.append("image", image);

    try {
      await axios.post(
        "http://192.168.1.29:5000/api/seller/add-product",
        formData,
        {
          headers: {
            Authorization: `Bearer ${sellers?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Product added successfully!");
      setShowForm(false);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        subcategories: "",
      });
      setImage(null);
      fetchProducts();
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 fixed h-full bg-white shadow z-10">
        <Selar_Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Navbar */}
        <div className="sticky top-0 z-10 bg-white shadow">
          <Selar_Navbar />
        </div>

        {/* Content */}
        <div className="p-6 pt-24">
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Seller Products
            </h1>

            <div className="flex flex-wrap gap-4">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              {/* <button
                onClick={() => fileInputRef.current.click()}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                <FaPlus /> Upload Product Image
              </button> */}
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                <FaPlus /> {showForm ? "Close Form" : "Add New Product"}
              </button>
            </div>
          </div>

          {/* Product Form */}
          {showForm && (
            <form
              onSubmit={handleProductSubmit}
              className="mb-8 bg-white p-6 rounded shadow space-y-4 border border-gray-200"
            >
              <div className="grid grid-cols-2 gap-4">

                <select
                  name="Product Name"
                  value={newProduct.name}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                >
                  <option value="">Select Product</option>
                  <option value="dress">dress</option>
                  <option value="jwellary">jwellary</option>
                  <option value="footware">footware</option>
                  <option value="shirt">shirt</option>
                  <option value="watch">watch</option>

                </select>

                <select
                  name="category"
                  value={newProduct.category}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                </select>

                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
                <input
                  type="text"
                  name="stock"
                  placeholder="Stock"
                  value={newProduct.stock}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <textarea
                name="description"
                placeholder="Description"
                value={newProduct.description}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />
              <input
                type="text"
                name="subcategories"
                placeholder="Subcategories (comma-separated)"
                value={newProduct.subcategories}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="block"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                Add Product
              </button>
            </form>
          )}

          {/* Product Table */}
          <div className="overflow-x-auto shadow rounded-lg border border-gray-200 bg-white">
            {loading ? (
              <p className="p-4">Loading products...</p>
            ) : !Array.isArray(products) || products.length === 0 ? (
              <p className="p-4">No products found.</p>
            ) : (
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Stock</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Subcategories</th>
                    <th className="px-6 py-3">Image</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr
                      key={product._id || product.id}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {product.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {product.description || "N/A"}
                      </td>
                      <td className="px-6 py-4">{product.price || "N/A"}</td>
                      <td className="px-6 py-4">{product.stock || "N/A"}</td>
                      <td className="px-6 py-4">{product.category || "N/A"}</td>
                      <td className="px-6 py-4">
                        {product.subcategories?.join(", ") || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {product.images?.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt="Product"
                            className="w-10 h-10 object-cover rounded"
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        <button className="text-blue-600 hover:underline cursor-pointer">
                          <FaEye className="h-4 w-4" />
                        </button>
                        <button className="text-yellow-600 hover:underline cursor-pointer">
                          <FaEdit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:underline cursor-pointer">
                          <MdOutlineDeleteForever className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selar_Products;
