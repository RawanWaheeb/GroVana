import { useContext, useEffect } from "react";
import WishListItem from "../../components/WishListItem/WishListItem";
import { WishListContext } from "../../Context/WishList.context";
import Loading from "../../components/Loading/Loading";
import wish from "../../assets/images/wishlist.png";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function WishList() {
  const { getProductWishList, wishInfo } = useContext(WishListContext);

  useEffect(() => {
    const handleWishlistChange = () => {
      getProductWishList();
    };

    window.addEventListener("wishlistChange", handleWishlistChange);

    return () => {
      window.removeEventListener("wishlistChange", handleWishlistChange);
    };
  }, [getProductWishList]);

  return (
    <>
      <Helmet>
        <title>Wishlist</title>
        <meta name="description" content="wishlist page" />
      </Helmet>

      {wishInfo === null ? (
        <Loading />
      ) : (
        <section>
          <div className="header-section flex gap-4 p-2 border-b-[1px] mb-10 border-red-200 rounded-lg w-fit m-auto items-center text-3xl font-semibold">
            <h2 className="text-gray-700">My Wishlist</h2>
            <span>
              <i className="fa-solid fa-heart text-red-600"></i>
            </span>
          </div>

          {!wishInfo || !Array.isArray(wishInfo) || wishInfo.length === 0 ? (
            <div className="flex justify-center items-center flex-col gap-4 mt-6">
              <div className="flex justify-center items-center">
                <img src={wish} alt="Empty Wishlist" className="w-full rounded-full" />
              </div>
              <h2 className="text-xl font-semibold text-gray-700">
                Your wishlist is empty, Go ahead and add something to the wishlist
              </h2>
              <Link
                to="/Products"
                className="bg-red-600 hover:bg-red-700 hover:text-black px-5 py-3 text-white font-lg font-semibold rounded-full"
              >
                Go to products
              </Link>
            </div>
          ) : (
            <>
              <div className="mt-8 space-y-8">
                {wishInfo.map((product) => {
                  if (!product || !product.slug) return null;
                  return <WishListItem key={product.slug} productinfo={product} />;
                })}
              </div>

              <div className="flex justify-center mt-10">
                <Link
                  to="/Products"
                  className="block w-fit bg-primary-buttons hover:bg-primary hover:text-black 
                    text-white px-6 py-2 rounded-lg font-semibold shadow-md"
                >
                  <i className="fa-solid fa-arrow-left ml-2"></i> Continue Exploring
                </Link>
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
}