







import { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { CartContext } from "../../Context/Cart.context";
import { userContext } from "../../Context/User.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { Helmet } from "react-helmet";
import Loading from "../../components/Loading/Loading";

export default function CheackOut() {
  const { cartInfo } = useContext(CartContext);
  const { token, setToken } = useContext(userContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(`Bearer ${storedToken}`);
    }
  }, [setToken]);

  const validationSchema = object({
    email: string()
      .required("Email address is required")
      .email("Email is invalid")
      .matches(/@/, "Email must contain '@'"),
    phone: string()
      .required("Phone number is required")
      .matches(/^\d{10,11}$/, "Phone number must be 10 or 11 digits"),
    address: string().required("Address is required"),
  });

  const handleOrder = async (values) => {
    const storedToken = localStorage.getItem("accessToken");
    let cart_id = localStorage.getItem("cart_id");
  
    if (!cart_id) {
      cart_id = `cart-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("cart_id", cart_id);
    }
  
    if (!storedToken || !cart_id) {
      toast.error("Please make sure you are logged in and have a cart.");
      return;
    }
  
    const outOfStockItems = cartInfo.filter(item => item.stock_quantity === 0);
    if (outOfStockItems.length > 0) {
      toast.error("Some products are out of stock. Please review your cart.");
      navigate("/cart");
      return;
    }
  
    const orderData = {
      email: values.email,
      phone: values.phone,
      address: values.address,
    };
  
    try {
      const { data } = await axios.post(
        "https://mohamednowar.pythonanywhere.com/api/checkout/",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (data.message === "Order placed successfully!") {
        toast.success("Order placed successfully!");
        navigate("/allorders");
      } else if (data.message && data.message.includes("Not enough stock")) {
        toast.error("Not enough stock for one or more items in your cart. Please review your cart.");
      } else {
        toast.error("An error occurred while placing the order.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        if (errorMessage.includes("Not enough stock")) {
          toast.error("Not enough stock for one or more items in your cart. Please review your cart.");
        } else {
          toast.error("An error occurred while placing the order.");
        }
      } else {
        toast.error("An error occurred while placing the order.");
      }
    }
  };
  
  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      address: "",
    },
    validationSchema,
    onSubmit: handleOrder,
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Helmet>
        <title>Checkout</title>
        <meta name="description" content="Checkout page" />
      </Helmet>
      <section className="w-full max-w-lg p-12 mb-12 border border-primary-buttons shadow-md rounded-xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold mb-12">Checkout</h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium mb-2">
              Email:
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                formik.errors.email && formik.touched.email ? "border-red-500" : "border-gray-300"
              }`}
              type="email"
              id="email"
              {...formik.getFieldProps("email")}
              placeholder="Enter Your Email"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500 mt-1 text-sm">{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-lg font-medium mb-2">
              Phone:
            </label>
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                formik.errors.phone && formik.touched.phone ? "border-red-500" : "border-gray-300"
              }`}
              type="text"
              id="phone"
              {...formik.getFieldProps("phone")}
              placeholder="Enter Your Phone"
            />
            {formik.errors.phone && formik.touched.phone && (
              <div className="text-red-500 mt-1 text-sm">{formik.errors.phone}</div>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="address" className="block text-lg font-medium mb-2">
              Address:
            </label>
            <textarea
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                formik.errors.address && formik.touched.address ? "border-red-500" : "border-gray-300"
              }`}
              id="address"
              {...formik.getFieldProps("address")}
              placeholder="Enter Your Address"
            />
            {formik.errors.address && formik.touched.address && (
              <div className="text-red-500 mt-1 text-sm">{formik.errors.address}</div>
            )}
          </div>

          <button type="submit" className="w-full bg-primary-buttons text-white hover:bg-primary hover:text-black py-2 rounded-lg">
            Checkout
          </button>
        </form>
      </section>
    </div>
  );
}
