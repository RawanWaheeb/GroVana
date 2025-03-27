

import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function NewPassword() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  function togglePasswordVisibility() {
    setShowPass((prev) => !prev);
  }

  const validationSchema = object({
    email: string().required("Email address is required").email("Email is invalid"),
    new_password: string()
      .required("Password is required")
      .min(8, "Password must contain at least 8 characters"),
  });

  async function newPass(values) {
    let toastLoadingId = toast.loading("Waiting...");

    try {
      const response = await axios.post(
        "https://mohamednowar.pythonanywhere.com/api/reset_password/",
        {
          email: values.email,
          new_password: values.new_password,
        },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000,
        }
      );

      if (response.data.status === 200) {
        toast.success(response.data.message || "Password reset successfully.");
        setTimeout(() => {
          navigate("/Login");
        }, 1200);
      } else {
        toast.error(response.data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      toast.dismiss(toastLoadingId);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      new_password: "",
    },
    validationSchema,
    onSubmit: newPass,
    validateOnBlur: false,
    validateOnChange: true,
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <section className="w-full max-w-lg p-12 mb-12 bg-primary-light shadow-md rounded-xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl text-center font-semibold mb-12">Reset Password</h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium mb-2">Email:</label>
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                formik.errors.email && formik.touched.email ? "border-red-500" : "border-gray-300"
              }`}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              {...formik.getFieldProps("email")}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="new_password" className="block text-lg font-medium mb-2">New Password:</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                id="new_password"
                name="new_password"
                placeholder="Enter New Password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                  formik.errors.new_password && formik.touched.new_password ? "border-red-500" : "border-gray-300"
                }`}
                {...formik.getFieldProps("new_password")}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={togglePasswordVisibility}
              >
              </button>
            </div>
            {formik.errors.new_password && formik.touched.new_password && (
              <p className="text-sm text-red-600 mt-1">{formik.errors.new_password}</p>
            )}
          </div>

          <button 
            type="submit"
            className="w-full bg-primary-buttons text-white py-3 rounded-xl text-lg font-semibold hover:bg-primary hover:text-black transition duration-1000"
          >
            Submit
            <span>
              <i className="fa-solid fa-paper-plane ml-2"></i>
            </span>
          </button>
        </form>
      </section>
    </div>
  );
}
