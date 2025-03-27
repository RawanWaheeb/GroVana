


import { useContext } from "react";
import { CartContext } from "../../Context/Cart.context";
import { Link } from "react-router-dom";

export default function CartItem({ productInfo }) {
  let { product, quantity } = productInfo;
  let { image, name, category, slug, price } = product;
  const { removeProductCart, updateCartProduct, reduceCartProduct } = useContext(CartContext);

  const isOutOfStock = product.quantity <= 0;

  return (
    <div className={`w-full max-w-[1000px] mx-auto bg-white bg-opacity-50 shadow-lg rounded-2xl p-4 
      grid grid-cols-1 sm:grid-cols-[100px_1fr_auto] items-center gap-4 transition-all hover:shadow-xl ${isOutOfStock ? "bg-red-400" : ""}`}>

      <div className="w-20 h-20 flex-shrink-0 mx-auto sm:mx-0">
        <img src={image} alt={name} className="w-full h-full object-cover rounded-lg" />
      </div>

      <div className="flex flex-col text-center sm:text-left">
        <h2 className="text-lg font-semibold text-gray-700">
          <Link to={`/Details/${slug}`} className="hover:text-primary transition-all">{name}</Link>
        </h2>
        <h3 className="text-sm text-gray-500">{category}</h3>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-24 justify-end">
        <div className="text-md font-bold text-gray-800 min-w-[90px]">
          <span className="text-md font-bold text-gray-800 mr-2">Price :</span>
          {price ? `${(price * quantity).toFixed(2)} EGP` : "N/A"}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => quantity > 1 ? reduceCartProduct(slug) : removeProductCart(slug)}
            disabled={isOutOfStock}
            className={`w-7 h-7 flex items-center justify-center ${isOutOfStock ? "bg-gray-300 cursor-not-allowed" : "bg-primary-buttons hover:bg-primary hover:text-black"} text-white rounded-full hover:scale-105 transition-all`}
          >
            <i className="fa-solid fa-minus"></i>
          </button>

          <span className="text-lg font-semibold text-gray-700">{quantity}</span>

          <button
            onClick={() => !isOutOfStock && updateCartProduct({ slug, quantity: quantity + 1 })}
            disabled={isOutOfStock}
            className={`w-7 h-7 flex items-center justify-center ${isOutOfStock ? "bg-gray-300 cursor-not-allowed" : "bg-primary-buttons hover:bg-primary hover:text-black"} text-white rounded-full hover:scale-105 transition-all`}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>

        <button
          onClick={() => removeProductCart(slug)}
          className="text-primary-buttons hover:text-red-600 hover:scale-110 transition-all"
        >
          <i className="fa-regular fa-trash-can text-xl"></i>
        </button>
      </div>

      {isOutOfStock && (
        <div className="flex items-center text-red-500 text-sm font-bold ">
          <i className="fa-solid fa-ban mr-2 font-bold"></i>
          <span className="whitespace-nowrap">Out of Stock</span>
        </div>
      )}
    </div>
  );
}