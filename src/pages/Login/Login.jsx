
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { userContext } from "../../Context/User.context";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import logo from "../../assets/images/logo.png"; 

export default function Login() {
  const { setToken } = useContext(userContext);
  const navigate = useNavigate();
  const [emailOrPasswordError, setEmailOrPasswordError] = useState(null);
  const [showPass, setShowPass] = useState(false);

  function togglePasswordVisibility() {
    setShowPass((prev) => !prev);
  }

  const validationSchema = object({
    email: string().required("Email address is required").email("Email is invalid"),
    password: string()
      .required("Password is required")
      .min(8, "Password must contain uppercase, lowercase, number, and special character"),
  });

  async function sendData(values) {
    let toastLoadingId = toast.loading("Waiting...");
    
    try {
      const { data } = await axios.post(
        "https://mohamednowar.pythonanywhere.com/api/login/",
        { email: values.email, password: values.password },
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (data.access) { 
        const bearerToken = `Bearer ${data.access}`;
        setToken(bearerToken);
  
        localStorage.setItem("accessToken", data.access);
        window.dispatchEvent(new Event("authChange")); 
  
        toast.success("User logged in successfully");
        fetchProfile();
  
        setTimeout(() => {
          navigate(location.state?.from || "/");  
        }, 2000);
      } else {
        toast.error("Login failed, no token received");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Invalid email or password";
      toast.error(errorMessage);
      setEmailOrPasswordError(errorMessage);
    } finally {
      toast.dismiss(toastLoadingId);
    }
  }
  const fetchProfile = async () => {
    try {
      const response = await fetch("https://mohamednowar.pythonanywhere.com/api/profile/", {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });

      if (!response.ok) throw new Error("Failed to fetch profile");

      const data = await response.json();
      localStorage.setItem("userProfile", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate(location.state?.from || "/");
    }
  }, [navigate, location.state]);
  
  const formik = useFormik({
    initialValues: { 
      email: "", 
      password: "" 
    },
    validationSchema,
    onSubmit: sendData,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login Page" />
      </Helmet>

      <div className="flex items-center justify-center h-screen px-6 sm:px-12 md:px-24 lg:px-48">
        <motion.div
          className="flex w-full max-w-5xl shadow-lg rounded-lg overflow-hidden relative flex-col lg:flex-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          <motion.div
            className="flex w-full lg:w-1/2 items-center justify-center p-12 bg-primary rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none"
            initial={{ x: "-50%", rotateY: 90 }}
            animate={{ x: "0%", rotateY: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <img src={logo} alt="GroVana Logo" className="w-50 h-50" />
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2 p-12 bg-primary-light rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none"
            initial={{ x: "50%", rotateY: -90 }}
            animate={{ x: "0%", rotateY: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <h3 className="text-center text-3xl font-bold mb-6">Welcome Back</h3>

            <form onSubmit={formik.handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block font-semibold">Email:</label>
                <input
                  className={`w-full p-4 border-2 rounded-lg focus:outline-none transition-colors duration-200 ease-in-out
                    ${formik.touched.email 
                      ? formik.errors.email 
                        ? "border-red-500 focus:ring-red-300"
                        : "border-primary focus:ring-primary"
                      : "border-gray-300 focus:border-primary focus:ring-primary"
                    }`}
                  {...formik.getFieldProps("email")}
                  type="email"
                  id="email"
                  placeholder="Enter Your Email"
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="text-red-500 text-sm mt-1">*{formik.errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block font-semibold">Password:</label>
                <div className="relative">
                  <input
                    className={`w-full p-4 border-2 rounded-lg focus:outline-none transition-colors duration-200 ease-in-out
                      ${formik.touched.password 
                        ? formik.errors.password 
                          ? "border-red-500 focus:ring-red-300"
                          : "border-primary focus:ring-primary"
                        : "border-gray-300 focus:border-primary focus:ring-primary"
                      }`}
                    type={showPass ? "text" : "password"}
                    id="password"
                    placeholder="Enter Your Password"
                    {...formik.getFieldProps("password")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-500"
                    onClick={togglePasswordVisibility}
                  >
                  </button>
                </div>
                {formik.errors.password && formik.touched.password && (
                  <p className="text-red-500 text-sm mt-1">*{formik.errors.password}</p>
                )}
              </div>

              {emailOrPasswordError && <p className="text-red-500 text-sm">*{emailOrPasswordError}</p>}

              <div className="space-y-4">
                <Link to="/forgetPassword" className="text-primary-buttons text-sm font-semibold block text-right">
                  Forgot Password?
                </Link>
                <button
                  type="submit"
                  className="w-full bg-primary-buttons text-white py-4 rounded-xl text-lg font-semibold hover:bg-primary hover:text-black transition duration-1000"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Loading..." : "Sign in"}
                </button>
              </div>

              <p className="text-center mt-4 text-sm">
                Don't have an account?{" "}
                <Link to="/Signup" className="text-primary-buttons font-semibold">Sign up</Link>
              </p>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}







