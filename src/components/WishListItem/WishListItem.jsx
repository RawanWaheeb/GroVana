


import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { WishListContext } from "../../Context/WishList.context";
import { CartContext } from "../../Context/Cart.context";

export default function WishListItem({ productinfo }) {
  let { removeProductWishList } = useContext(WishListContext);
  let { addProductToCart } = useContext(CartContext);

  let { name, price, category, image, slug } = productinfo;

  return (
    <>
      <table className="w-full bg-white bg-opacity-40 shadow-md shadow-red-200 rounded-2xl">
        <tr className="flex flex-col md:flex-row md:justify-between justify-center items-center rounded-2xl content-center">
          <td className="p-3">
            <img src={image} alt={name} className="w-24 h-24 rounded-full" />
          </td>
          <td className="p-4">
            <h2 className="text-xl text-center font-semibold w-[200px] line-clamp-2">
              {name}
            </h2>
          </td>
          <td>
            <h3 className="text-xl text-gray-500 font-semibold">
              {category}
            </h3>
          </td>
          <td className="p-4">
            <p className="text-md font-bold">
              <span className="text-lg font-bold mr-2">Price :</span>
              {price} EGP
            </p>
          </td>
          <td className="p-4 flex gap-4">
            <button
              className="mt-4 bg-primary-buttons hover:bg-primary hover:text-black transition-colors py-2 px-3 rounded-2xl text-white font-semibold text-sm shadow-md flex items-center gap-2"
              onClick={() => addProductToCart(slug)}
            >
              Add to Cart <FaShoppingCart />
            </button>
            <button
              className="text-primary-buttons hover:text-red-600 transition-colors "
              onClick={() => removeProductWishList(slug)}
            >
              <i className="fa-regular fa-trash-can text-2xl mt-3"></i>
            </button>
          </td>
        </tr>
      </table>
    </>
  );
}


