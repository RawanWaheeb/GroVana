




import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { userContext } from "./User.context";

export const WishListContext = createContext(null);

export default function WishListProvider({ children }) {
  const [wishInfo, setWishInfo] = useState([]);
  const { token, setToken } = useContext(userContext);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken && !token) {
      setToken(`Bearer ${storedToken}`);
    }
  }, [token, setToken]);

  const getProductWishList = useCallback(async () => {
    const storedToken = localStorage.getItem("accessToken");
    if (!storedToken) return;

    try {
      const { data } = await axios.get("https://mohamednowar.pythonanywhere.com/api/wishlist/", {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      
      if (Array.isArray(data)) {
        setWishInfo(data.map(item => item.product).filter(product => product?.slug));
      } else {
        toast.error("Failed to fetch wishlist.");
      }
    } catch (error) {
      toast.error("Error fetching wishlist.");
    }
  }, []);

  const addProductToWishList = useCallback(async (productSlug) => {
    const storedToken = localStorage.getItem("accessToken");
    if (!storedToken) {
      toast.error("Please log in to add items to wishlist.");
      return;
    }

    if (wishInfo.some(product => product.slug === productSlug)) {
      toast.error("This product is already in your wishlist.");
      return;
    }

    let toastId = toast.loading("Adding to wishlist...");
    try {
      const { data } = await axios.post("https://mohamednowar.pythonanywhere.com/api/wishlist/", 
        { product_slug: productSlug },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      if (data.product) {
        toast.success("Added to wishlist!");
        await getProductWishList();
        window.dispatchEvent(new Event("wishlistChange"));
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to add to wishlist.");
    } finally {
      toast.dismiss(toastId);
    }
  }, [wishInfo, getProductWishList]);

  const removeProductWishList = useCallback(async (productSlug) => {
    const storedToken = localStorage.getItem("accessToken");
    if (!storedToken) {
      toast.error("User is not authenticated. Please log in.");
      return;
    }

    if (!wishInfo.some(product => product.slug === productSlug)) {
      toast.error("This product is not in your wishlist.");
      return;
    }

    try {
      await axios.delete(`https://mohamednowar.pythonanywhere.com/api/wishlist/delete/${productSlug}/`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      toast.success("Product removed from wishlist ❤");
      setWishInfo(prev => prev.filter(product => product.slug !== productSlug));
      window.dispatchEvent(new Event("wishlistChange"));
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to remove product from wishlist.");
    }
  }, [wishInfo]);

  useEffect(() => {
    if (token) {
      getProductWishList();
    }
  }, [token, getProductWishList]);

  return (
    <WishListContext.Provider value={{ wishInfo, addProductToWishList, removeProductWishList, getProductWishList }}>
      {children}
    </WishListContext.Provider>
  );
}

