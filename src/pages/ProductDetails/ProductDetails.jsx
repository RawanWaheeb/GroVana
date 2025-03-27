

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/Cart.context";
import { WishListContext } from "../../Context/WishList.context";
import { Helmet } from "react-helmet";
import { Tabs, Tab } from "@mui/material";
import { useRef } from "react";
import { FaHeart, FaShoppingCart, FaStar, FaRegStar } from "react-icons/fa"; 

export default function ProductDetails() {
  const productDetailsRef = useRef(null);
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishList, removeProductWishList, wishInfo } = useContext(WishListContext);
  const { slug } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const [wishlistAdded, setWishlistAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [isRated, setIsRated] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  if (!token) return;
  const payload = JSON.parse(atob(token.split(".")[1]));

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const headers = { Authorization: `Bearer ${token}` };

  async function getProductDetails() {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `https://mohamednowar.pythonanywhere.com/api/products/${slug}/`,
        { headers }
      );
      setProductDetails(data);
      const savedRating = localStorage.getItem(`rating-${slug}`);
      setRating(savedRating ? parseInt(savedRating) : data?.rating || 0);
      
      const relatedResponse = await axios.get(
        `https://mohamednowar.pythonanywhere.com/api/products/?category=${encodeURIComponent(data.category)}`,
        { headers }
      );
      setRelatedProducts(relatedResponse.data?.filter(p => p.slug !== data.slug).slice(0, 4));
    } catch {
      setError("Failed to load product details. Please try again later.");
      setProductDetails(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) getProductDetails();
  }, [slug, token]);

  useEffect(() => {
    setWishlistAdded(wishInfo.some(product => product.slug === productDetails?.slug));
  }, [wishInfo, productDetails]);

  function handleAddToCart() {
    if (!productDetails) return;
    addProductToCart({ productId: productDetails.slug });
    navigate("/cart");
  }

  function handleViewDetails(productSlug) {
         navigate(`/details/${productSlug}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
  

  function handleWishlist() {
    wishlistAdded ? removeProductWishList(productDetails.slug) : addProductToWishList(productDetails.slug);
    setWishlistAdded(!wishlistAdded);
  }

  async function handleRatingSubmit(newRating) {
    try {
      await axios.post(
        `https://mohamednowar.pythonanywhere.com/api/products/${slug}/rate/`,
        { rating: newRating },
        { headers }
      );
      setRating(newRating);
      setIsRated(true);
      localStorage.setItem(`rating-${slug}`, newRating);
    } catch (error) {
      console.error("Failed to submit rating:", error);
    }
  }

  function renderStars() {
    return [...Array(5)].map((_, i) => (
      <span key={i + 1} onClick={!isRated ? () => handleRatingSubmit(i + 1) : undefined}>
        {i + 1 <= rating ? <FaStar className="text-yellow-400 cursor-pointer" /> : <FaRegStar className="text-yellow-400 cursor-pointer" />}
      </span>
    ));
  }

  return (
    <>
      <Helmet>
        <title>{productDetails ? productDetails.name : "Product Details"}</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500 text-center py-10">{error}</p>
      ) : (
        <section className="flex flex-col md:flex-row-reverse items-center gap-16 py-20">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={productDetails?.image || "/placeholder.jpg"}
              alt={productDetails?.name || "Product Image"}
              className="w-full max-w-lg rounded-2xl object-contain shadow-xl transition-transform duration-1000 hover:scale-105"
            />
          </div>

          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl font-semibold">{productDetails?.name || "No Product Name"}</h2>
          
            <div className="flex items-center gap-1">
              {renderStars()}
            </div>

            <h3 className="text-xl font-semibold text-primary-buttons">{productDetails?.category || "Unknown Category"}</h3>
            <p className="text-lg font-bold">{productDetails?.price ? `${productDetails.price} EGP` : "Price not available"}</p>

            <div className="flex items-center gap-4">
              <button
             onClick={() => addProductToCart(productDetails.slug)}
                className="mt-4 bg-primary-buttons hover:bg-primary hover:text-black transition-colors py-2 px-6 rounded-xl text-white font-semibold text-lg shadow-md flex items-center gap-2"
              >
                Add To Cart <FaShoppingCart />
              </button>
              <button
                onClick={handleWishlist}
                className="border-2 border-primary-buttons p-2 mt-3 rounded-full transition-colors hover:bg-gray-200"
              >
                <FaHeart className={`text-2xl transition-colors ${wishlistAdded ? "text-red-500" : "text-gray-400"}`} />
              </button>
            </div>

            <Tabs
              value={tabIndex}
              onChange={(e, newIndex) => setTabIndex(newIndex)}
              centered
              TabIndicatorProps={{ style: { backgroundColor: "#2E5B41", height: "3px" } }}
            >
              <Tab label="DETAILS" sx={{ fontWeight: "bold", "&.Mui-selected": { color: "#2E5B41" } }} />
              <Tab label="CARE" sx={{ fontWeight: "bold", "&.Mui-selected": { color: "#2E5B41" } }} />
            </Tabs>
            <div className="mt-4 p-4 border rounded-lg bg-gray-100">
              {tabIndex === 0 ? (
                <p className="text-primary-buttons text-md">{productDetails?.description || "No description available."}</p>
              ) : (
                <p className="text-primary-buttons whitespace-pre-line">{productDetails?.care_guide || "No care guide available."}</p>
              )}
            </div>
          </div>
        </section>
      )}
      <hr className="my-8 border-t-4 border-gray-300" />
      {relatedProducts.length > 0 && (
        <section className="py-10">
          <h2 className="text-3xl font-semibold text-center mb-12">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.slug} className="border rounded-xl p-4 shadow-md transition-transform duration-1000 hover:scale-105 flex flex-col items-center">
                <img src={product.image} alt={product.name} className="w-full h-40 object-contain rounded-md" onError={(e) => (e.target.src = "/placeholder.jpg")} />
                <h3 className="mt-5 text-lg font-semibold text-center">{product.name}</h3>
                <p className="text-primary-buttons font-bold text-center mt-2">{product.price} EGP</p>
                <button onClick={() => navigate(`/product/${product.slug}`)} className="mt-3 mb-4 bg-primary-buttons text-white py-2 px-4 rounded-lg hover:bg-primary hover:text-black transition-transform duration-1000 flex justify-center">View Details</button>

              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}