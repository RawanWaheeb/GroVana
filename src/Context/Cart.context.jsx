






import { createContext, useState, useCallback, useEffect, useContext } from "react";
import { userContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  let [cartInfo, setCartInfo] = useState(null);
  let [loading, setLoading] = useState(false);
  const { token, setToken } = useContext(userContext);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken && !token) {
      setToken(`Bearer ${storedToken}`);
    }
  }, [token, setToken]);

  const getCartProduct = useCallback(async () => {
    const storedToken = localStorage.getItem("accessToken");
    if (!storedToken) {
      return;
    }

    setLoading(true);
    try {
      const options = {
        url: "https://mohamednowar.pythonanywhere.com/api/cart/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      };
      let { data } = await axios.request(options);
      setCartInfo(data.length > 0 ? data : []);
      window.dispatchEvent(new Event("cartChange"));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getCartProduct();
    }
  }, [token, getCartProduct]);

  const addProductToCart = async (slug) => {
    const storedToken = localStorage.getItem("accessToken");
    if (!storedToken) {
      toast.error("You must be logged in to add a product to the cart!");
      return;
    }

    try {
      const options = {
        url: "https://mohamednowar.pythonanywhere.com/api/cart/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      };
      let { data: cartData } = await axios.request(options);
      const product = cartData?.find(item => item.product.slug === slug);
      if (product && product.product.quantity <= 0) {
        toast.error("This product is out of stock!");
        return;
      }

      const addOptions = {
        url: "https://mohamednowar.pythonanywhere.com/api/cart/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
        data: { product_slug: slug },
      };

      await axios.request(addOptions);
      toast.success("Product added to the cart!");
      setTimeout(() => {
        getCartProduct();
      }, 500);
      window.dispatchEvent(new Event("cartChange"));
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("accessToken");
        window.dispatchEvent(new Event("authChange"));
      } else {
        toast.error("Error while adding the product.");
      }
    }
  };

  
  
  



  const updateCartProduct = async ({ slug, quantity }) => {
    const storedToken = localStorage.getItem("accessToken");
    if (!storedToken) {
      toast.error("You must be logged in to update the cart!");
      return;
    }
  
    
    const productInCart = cartInfo.find(item => item.product.slug === slug);
    if (productInCart) {
      const availableQuantity = productInCart.product.quantity;
      if (quantity > availableQuantity) {
        console.log(`Stock limit reached! Only ${availableQuantity} items available.`);
        toast.error(`Only ${availableQuantity} items available in stock!`);
        return;
      }
    }
  
    try {
      const options = {
        url: "https://mohamednowar.pythonanywhere.com/api/cart/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
        data: { product_slug: slug, quantity },
      };
  
      await axios.request(options);
      toast.success("Product updated successfully!");
      setTimeout(() => {
        getCartProduct();
      }, 500);
      window.dispatchEvent(new Event("cartChange"));
    } catch (error) {
      toast.error("Error while updating the product.");
    }
  };
  
  

  const reduceCartProduct = async (slug, quantity) => {
    const storedToken = localStorage.getItem("accessToken");
    if (!storedToken) return;
    if (quantity === 1) {
      return removeProductCart(slug);
    }
    try {
      const options = {
        url: `https://mohamednowar.pythonanywhere.com/api/cart/reduce-delete/${slug}/`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
        data: { quantity: -1 },
      };
      await axios.request(options);
      toast.success("Quantity reduced!");
      setTimeout(() => {
        getCartProduct();
      }, 500);
      window.dispatchEvent(new Event("cartChange"));
    } catch (error) {
      toast.error("Error while reducing the product.");
    }
  };

  const removeProductCart = async (slug) => {
    const storedToken = localStorage.getItem("accessToken");
    if (!storedToken) return;
    try {
      const options = {
        url: `https://mohamednowar.pythonanywhere.com/api/cart/reduce-delete/${slug}/`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      };
      await axios.request(options);
      toast.success("Product removed from the cart!");
      setTimeout(() => {
        getCartProduct();
      }, 500);
      window.dispatchEvent(new Event("cartChange"));
    } catch (error) {
      toast.error("Error while removing the product.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        getCartProduct,
        cartInfo,
        loading,
        addProductToCart,
        updateCartProduct,
        removeProductCart,
        reduceCartProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}