





import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout"; 
import Home from "./components/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";  
import { Toaster } from "react-hot-toast";
import ProductedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NotFound from "./pages/NotFound/NotFound";
import UserProvider from "./Context/User.context";
import CartProvider from "./Context/Cart.context";
import WishListProvider from "./Context/WishList.context";  
import GuestRoute from "./components/GuestRoute/GuestRoute";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/profile/Profile";
import Products from "./pages/Products/Products";
import AiScanner from "./components/aiScaner/AiScaner";
import Community from "./components/community/Community";
import Wishlist from "./pages/Wishlist/Wishlist";  
import CheackOut from "./pages/CheackOut/CheackOut";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import NewPassword from "./pages/NewPassword/NewPassword";
import Orders from "./pages/Orders/Orders";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "Products", element: <Products /> }, 
        { path: "ai_help", element: <AiScanner /> },
        { path: "community", element: <Community /> },
      ],
    },                                                                   

    {
      path: "/",
      element: (
        <ProductedRoute>
          <Layout />
        </ProductedRoute>
      ),
      children: [
        { path: "profile", element: <Profile /> },
        { path: "UpdateProfile", element: <UpdateProfile /> }, 
        { path: "cart", element: <Cart/> },
        { path: "wishlist", element: <Wishlist /> },  
        { path: "cheacout", element: <CheackOut /> }, 
        { path: "allorders", element: <Orders /> },
        { path: "product/:slug", element: <ProductDetails /> },
      ],
    },

    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/forgetPassword", element: <ForgetPassword /> },
    { path: "/resetpassword", element: <ResetPassword /> },  
    { path: "/newpassword", element: <NewPassword /> },
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <>
     <ToastContainer />
      <UserProvider>
        <CartProvider>
          <WishListProvider>  
            <RouterProvider router={router} />
            <Toaster position="top-center" />
          </WishListProvider>
        </CartProvider>
      </UserProvider>
    </>
  );
}



