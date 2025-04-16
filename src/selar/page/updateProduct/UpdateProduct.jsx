import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Selar_Sidebar from "../dashboard/Selar_Sidebar";
import Selar_Navbar from "../dashboard/Selar_Navbar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UpdateProduct = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const productData = state?.product;
  const [image, setImage] = useState(null);
  const token = useSelector((state) => state.seller.sellerInfo?.token);

  const initialValues = {
    name: productData?.name || "",
    description: productData?.description || "",
    price: productData?.price || "",
    stock: productData?.stock || "",
    category: productData?.category || "",
    subcategories: Array.isArray(productData?.subcategories)
      ? productData?.subcategories[0]
      : productData?.subcategories || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
    stock: Yup.number().required("Stock is required"),
    category: Yup.string().required("Category is required"),
    subcategories: Yup.string().required("Subcategory is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const subcategoryArray = values.subcategories
      .split(",")
      .map((item) => item.trim());

    const formDataToSend = new FormData();
    formDataToSend.append("name", values.name);
    formDataToSend.append("description", values.description);
    formDataToSend.append("price", values.price);
    formDataToSend.append("stock", values.stock);
    formDataToSend.append("category", values.category);
    formDataToSend.append("subcategories", JSON.stringify(subcategoryArray));
    if (image) {
      formDataToSend.append("images", image);
    }

    try {
      const baseUrl = process.env.VITE_BASE_URL;
      const response = await axios.patch(
        `${baseUrl}${productData._id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        alert("Product updated successfully!");
        navigate("/Selar_Product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex">
      <div className="w-64 fixed h-full bg-white shadow z-10">
        <Selar_Sidebar />
      </div>

      <div className="flex-1 ml-64">
        <div className="sticky top-0 z-10 bg-white shadow">
          <Selar_Navbar />
        </div>

        <div className="flex justify-center items-center min-h-screen p-6 bg-gray-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Update Product</h2>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        className="border p-2 rounded w-full"
                      />
                      <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div>
                      <Field
                        type="text"
                        name="price"
                        placeholder="Price"
                        className="border p-2 rounded w-full"
                      />
                      <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div>
                      <Field
                        type="text"
                        name="stock"
                        placeholder="Stock"
                        className="border p-2 rounded w-full"
                      />
                      <ErrorMessage name="stock" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div>
                      <Field
                        as="select"
                        name="category"
                        className="border p-2 rounded w-full"
                      >
                        <option value="">Select Category</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                      </Field>
                      <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>

                  <div>
                    <Field
                      as="textarea"
                      name="description"
                      placeholder="Description"
                      className="border p-2 rounded w-full"
                    />
                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <Field
                      as="select"
                      name="subcategories"
                      className="border p-2 rounded w-full"
                    >
                      <option value="">Select Subcategory</option>
                      <option value="dress">Dress</option>
                      <option value="jewellery">Jewellery</option>
                      <option value="footwear">Footwear</option>
                      <option value="shirt">Shirt</option>
                      <option value="watch">Watch</option>
                    </Field>
                    <ErrorMessage name="subcategories" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                      className="block"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                  >
                    {isSubmitting ? "Updating..." : "Update Product"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
