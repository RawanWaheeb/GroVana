





import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, string, ref } from "yup";
import { Helmet } from "react-helmet";

export default function Signup() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState("password");

  function showPassword() {
    setShowPass((prev) => (prev === "password" ? "text" : "password"));
  }

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const validationSchema = object({
    first_name: string().required("First Name is required").min(3, "First Name must be at least 3 characters"),
    last_name: string().required("Last Name is required").min(3, "Last Name must be at least 3 characters"),
    username: string().required("Username is required").min(3, "Username must be at least 8 characters"),
    date_of_birth: string().required("Date of Birth is required"),
    gender: string().required("Gender is required"),
    phone_number: string()
      .required("Phone Number is required")
      .matches(/^[0-9]{10,11}$/, "Phone number must be 10 or 11 digits"),
    email: string().required("Email is required").email("Invalid email"),
    password: string()
      .required("Password is required")
      .matches(passwordRegex, "Password must contain uppercase, lowercase, number, and special character"),
    confirm_password: string()
      .oneOf([ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  async function sendData(values) {
    try {
      const response = await axios.post("https://mohamednowar.pythonanywhere.com/api/register/", values, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.access) {
        // ✅ حذف أي `token` قديم لمنع التعارض
        localStorage.removeItem("Bearer");
        localStorage.removeItem("RefreshToken");
        sessionStorage.clear();

        // ✅ حفظ `token` الجديد
        localStorage.setItem("Bearer", response.data.access);
        localStorage.setItem("RefreshToken", response.data.refresh);

        toast.success("Registration successful!");

        // ✅ إعادة توجيه المستخدم إلى صفحة `Login`
        console.log("🚀 Redirecting to /login...");
        navigate("/login", { replace: true });
      } else {
        toast.error("No token received, please check your credentials.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Account Already Exist. Please try again.");
    }
  }

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      date_of_birth: "",
      gender: "",
      phone_number: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema,
    onSubmit: sendData,
  });

  return (
    <>
      <Helmet>
        <title>SignUp</title>
      </Helmet>
      <div className="flex items-center justify-center min-h-screen px-6 sm:px-12 md:px-24 lg:px-48">
        <motion.div
          className="flex w-full max-w-5xl shadow-lg rounded-lg overflow-hidden relative flex-col lg:flex-row-reverse"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <motion.div
            className="w-full lg:w-1/2 bg-primary flex items-center justify-center p-8"
            initial={{ x: "50%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <img src="../../src/assets/images/logo.png" alt="GroVana Logo" className="w-50 h-50" />
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2 p-8 bg-primary-light flex flex-col justify-center rounded-l-lg"
            initial={{ x: "-50%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <h2 className="text-3xl font-bold text-center mb-6">Join Us Now!</h2>
            <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[{
                  name: "first_name", placeholder: "First Name" },
                { name: "last_name", placeholder: "Last Name" },
                { name: "username", placeholder: "Username", fullWidth: true },
                { name: "date_of_birth", type: "date" },
                { name: "gender", type: "select", options: [{ value: "M", label: "Male" }, { value: "F", label: "Female" }] },
                { name: "phone_number", placeholder: "Phone Number", fullWidth: true },
                { name: "email", placeholder: "Email", fullWidth: true },
                { name: "password", placeholder: "Password", type: showPass, fullWidth: true },
                { name: "confirm_password", placeholder: "Confirm Password", type: showPass, fullWidth: true },
              ].map(({ name, placeholder, type = "text", options, fullWidth }) => (
                <div key={name} className={`w-full ${fullWidth ? "col-span-1 md:col-span-2" : ""}`}>
                  {type === "select" ? (
                    <select {...formik.getFieldProps(name)} className="w-full p-4 border-2 rounded-lg focus:outline-none border-gray-300 focus:border-primary">
                      <option value="">Select Gender</option>
                      {options.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  ) : (
                    <input {...formik.getFieldProps(name)} type={type} placeholder={placeholder} className="w-full p-4 border-2 rounded-lg focus:outline-none border-gray-300 focus:border-primary" />
                  )}
                  {formik.touched[name] && formik.errors[name] && (
                    <p className="text-red-500 text-sm mt-1">*{formik.errors[name]}</p>
                  )}
                </div>
              ))}
              <button type="submit" className="w-full bg-primary-buttons text-white hover:bg-primary hover:text-black transition duration-1000 p-4 rounded-xl md:col-span-2 font-bold">
                Sign Up
              </button>
            </form>
            <p className="text-center mt-4">
              Already have an account?
              <Link to="/login" className="text-primary-buttons font-bold"> Login</Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}






