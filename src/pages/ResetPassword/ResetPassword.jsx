import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function VerifyOTP() {
  const navigate = useNavigate();

  const validationSchema = object({
    email: string().required("Email address is required").email("Email is invalid"),
    otp: string().required("Verification code is required"),
  });

  async function verifyOTP(values) {
    let toastLoadingId = toast.loading("Verifying...");
  
    try {
      const token = localStorage.getItem("accessToken"); 
  
      const { data } = await axios.post(
        "https://mohamednowar.pythonanywhere.com/api/verify_otp/",
        { email: values.email, otp: values.otp },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token, 
          },
        }
      );
  
      toast.success("OTP Verified Successfully");
  
      setTimeout(() => {
        navigate("/newPassword");
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.detail || "Invalid OTP");
    } finally {
      toast.dismiss(toastLoadingId);
    }
  }
  
  

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    validationSchema,
    onSubmit: verifyOTP,
  });

  return (
    <section className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg p-12 mb-12 bg-primary-light shadow-md rounded-xl">
        <h2 className="text-3xl text-center font-semibold mb-12">Verify Your Code</h2>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-lg font-medium mb-2">Your Email:</label>
            <input
              className={`w-full px-4 py-2 border rounded-lg text-gray-700 mb-2 focus:outline-none focus:ring-2 focus:ring-primary transition ${
                formik.errors.email && formik.touched.email ? "border-red-500" : "border-gray-300"
              }`}
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-sm text-red-600 mt-1">*{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="otp" className="block text-lg font-medium mb-2">Enter Verification Code:</label>
            <input
              className={`w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition ${
                formik.errors.otp && formik.touched.otp ? "border-red-500" : "border-gray-300"
              }`}
              type="text"
              id="otp"
              name="otp"
              value={formik.values.otp}
              placeholder="Enter Code"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.otp && formik.touched.otp && (
              <p className="text-sm text-red-600 mt-1">*{formik.errors.otp}</p>
            )}
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              type="submit"
              className="w-full bg-primary-buttons text-white py-3 rounded-xl text-lg font-semibold hover:bg-primary hover:text-black transition duration-1000"
            >
              Verify Code
            </button>
          </div>

          <div className="text-center mt-3">
            <Link to={"/forgetPassword"} className="text-primary-buttons font-bold text-sm">
              Didn't receive the code? Resend
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
