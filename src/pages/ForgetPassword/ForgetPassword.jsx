

import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function ForgetPassword() {
  const navigate = useNavigate();

  const validationSchema = object({
    email: string()
      .required("Email address is required")
      .email("Email is invalid"),
  });

  async function forgetPass(values) {
    let toastLoadingId = toast.loading("Waiting...");

    try {
      await axios.post(
        "https://mohamednowar.pythonanywhere.com/api/get_otp/",
        { email: values.email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
          mode: "cors",
        }
      );

      toast.success("OTP sent successfully!");

      setTimeout(() => {
        navigate("/resetpassword", { state: { email: values.email } });
      }, 2000);
    } catch (error) {
      let errorMessage = "Failed to send OTP. Please try again.";
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      }

      toast.error(errorMessage);
    } finally {
      toast.dismiss(toastLoadingId);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: forgetPass,
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg p-12 mb-12 bg-primary-light shadow-md rounded-xl">
        <h2 className="text-3xl text-center font-semibold mb-12">
          Forget Your Password
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium mb-2">
              Your Email :
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 transition 
                ${
                  formik.errors.email && formik.touched.email
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-primary"
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
          <button
            type="submit"
            className="w-full bg-primary-buttons text-white py-3 rounded-xl text-lg font-semibold hover:bg-primary hover:text-black transition duration-1000"
          >
            Send Mail{" "}
            <span>
              <i className="text-xm fa-solid fa-paper-plane"></i>
            </span>
          </button>
        </form>
        <div className="mt-4 text-right font-bold">
          <Link to="/Login" className="text-primary-buttons">
            Go to Login?
          </Link>
        </div>
      </div>
    </div>
  );
}
