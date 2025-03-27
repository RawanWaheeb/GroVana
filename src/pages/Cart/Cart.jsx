







import { useContext, useEffect, useMemo } from "react";
import { CartContext } from "../../Context/Cart.context";
import Loading from "../../components/Loading/Loading";
import cart from "../../assets/images/Empty-cart.svg";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import CartItem from "../../components/CartItem/CartItem";

export default function Cart() {
  const { getCartProduct, cartInfo } = useContext(CartContext);

  useEffect(() => {
    getCartProduct();
  }, [getCartProduct]);

  const totalPrice = useMemo(() => {
    return (
      cartInfo?.reduce((total, product) => {
        return product.product.quantity > 0
          ? total + product.product.price * product.quantity
          : total;
      }, 0) || 0
    );
  }, [cartInfo]);

  return (
    <>
      <Helmet>
        <title>Cart</title>
        <meta name="description" content="Cart page GroVana" />
      </Helmet>

      {cartInfo === null ? (
        <Loading />
      ) : (
        <section className="container mx-auto p-6">
          <div className="title flex items-center p-5 text-2xl font-semibold">
            <h2 className="flex items-center gap-2">
              | Your Shopping Cart <FaShoppingCart className="text-primary-buttons" />
            </h2>
          </div>

          {cartInfo.length === 0 ? (
            <div className="flex flex-col items-center gap-4 mt-6 text-center">
              <img src={cart} alt="Empty cart" className="w-3/4 sm:w-1/2" />
              <h2 className="text-xl font-semibold text-gray-700">
                Your cart is empty. Go ahead and add something to the cart!
              </h2>
              <Link
                to="/Products"
                className="bg-primary-700 hover:bg-primary px-5 py-3 text-white font-lg font-semibold rounded-full"
              >
                Go to Order Now
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-start gap-6 mt-8">
              <div className="w-full space-y-4">
                {cartInfo.map((product) => (
                  <CartItem key={product.product.slug} productInfo={product} />
                ))}
                <Link
                  to="/Products"
                  className="block w-fit bg-primary-buttons hover:bg-primary hover:text-black text-white px-6 py-2 mt-6 rounded-lg font-semibold mx-auto"
                >
                  <i className="fa-solid fa-arrow-left ml-2"></i> Continue Exploring
                </Link>
              </div>

              <div className="bg-white shadow-lg rounded-xl p-6 border border-primary-buttons w-full max-w-[500px] mx-auto">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Order Summary</h3>
                <div className="flex justify-between text-gray-700 mb-2">
                  <span>Subtotal:</span>
                  <span>{totalPrice.toFixed(2)} EGP</span>
                </div>
                <div className="flex justify-between text-gray-700 mb-2">
                  <span>Shipping:</span>
                  <span>Flat Rate</span>
                </div>
                <hr className="my-2 border-gray-300" />
                <div className="flex justify-between font-semibold text-lg text-gray-900">
                  <span>Total:</span>
                  <span>{totalPrice.toFixed(2)} EGP</span>
                </div>

                <div className="flex flex-col gap-3 mt-6">
                  <Link
                    to="/cheacout"
                    className="w-full py-2 text-white font-semibold rounded-lg bg-primary-buttons hover:bg-primary hover:text-black flex items-center justify-center"
                  >
                    Checkout <i className="fa-solid fa-arrow-right ml-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}


