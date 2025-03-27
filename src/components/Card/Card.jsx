

import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../Context/Cart.context";
import { WishListContext } from "../../Context/WishList.context";
import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Card({ productInfo }) {
  if (!productInfo) {
    return null;
  }

  const { name, price, image, slug, stock_quantity } = productInfo;
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishList, removeProductWishList, wishInfo, getProductWishList } = useContext(WishListContext);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(Array.isArray(wishInfo) && wishInfo.some((item) => item.slug === slug));
  }, [wishInfo, slug]);

  const handleFavorite = async () => {
    if (isFavorite) {
      await removeProductWishList(slug);
    } else {
      await addProductToWishList(slug);
    }
    getProductWishList();
    setIsFavorite(!isFavorite);
  };

  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `https://mohamednowar.pythonanywhere.com/media/${image}`
    : "https://via.placeholder.com/150";

  const isOutOfStock = stock_quantity === 0;

  return (
    <div className="relative bg-white rounded-2xl p-4 shadow-lg transition duration-1000 hover:shadow-xl hover:border-primary-buttons group">
      <div
        className="absolute top-3 left-3 cursor-pointer transition duration-1000 opacity-0 group-hover:opacity-100"
        onClick={handleFavorite}
      >
        <FaHeart className={`text-2xl ${isFavorite ? "text-red-500" : "text-gray-400"}`} />
      </div>
     
<Link to={`/product/${slug}`} className="absolute top-3 right-3 cursor-pointer transition duration-1000 opacity-0 group-hover:opacity-100">
  <FaEye className="text-2xl text-gray-500 hover:text-primary-buttons z-50" />
</Link>


      <div className="overflow-hidden rounded-md">
        <img
          src={imageUrl}
          alt={name || "Product Image"}
          className="w-full h-48 object-contain transition-transform duration-1000 group-hover:scale-105 pointer-events-none mb-2 p-2"
        />
      </div>

      <div className="text-center mt-3">
        <h2 className="text-lg font-semibold text-gray-800">{name || "No Title"}</h2>
        <p className="text-primary-buttons text-lg font-bold mt-4">
          {price ? `${price} EGP` : "Price Unavailable"}
        </p>
        {isOutOfStock && (
          <p className="text-red-500 font-bold mt-2">Out Of Stock !</p>
        )}
      </div>

      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => {
            if (!isOutOfStock) {
              addProductToCart(slug);
            }
          }}
          className="flex items-center justify-center  gap-2 bg-primary-buttons text-white py-2 px-8 rounded-2xl transition duration-1000 hover:bg-primary hover:text-black opacity-0 group-hover:opacity-100"
          disabled={isOutOfStock}
        >
          {isOutOfStock ? "Out Of Stock " : "Add to Cart" } <FaShoppingCart />
        </button>
      </div>
    </div>
  );
}
