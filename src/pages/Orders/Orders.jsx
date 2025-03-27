

import { useContext, useEffect, useState } from "react";
import { userContext } from "../../Context/User.context"; 
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";
import order from "../../assets/images/order.png";
import { Link } from "react-router-dom";

export default function Orders() {
  const { token, setToken } = useContext(userContext);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(`Bearer ${storedToken}`);
    }
  }, [setToken]);

  async function getUserOrders() {
    try {
      const storedToken = localStorage.getItem("accessToken");
      if (!storedToken) return;

      const options = {
        url: "https://mohamednowar.pythonanywhere.com/api/orders/", 
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      };

      let { data } = await axios.request(options);
      setOrders(data);
    } catch (error) {}
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <>
      <Helmet>
        <title>Orders</title>
        <meta name="description" content="Orders page" />
      </Helmet>

      {orders?.length === 0 ? (
        <div className="w-full text-center gap-4 flex flex-col justify-center items-center">
          <img src={order} className="w-[35%]" alt="No Orders" />
          <h2 className="text-gray-700  text-2xl font-semibold">
            There are no orders yet
          </h2>
          <Link
            to="/"
            className="bg-primary-buttons hover:bg-primary px-5 py-3 text-white hover:text-black font-lg font-semibold rounded-full"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <>
          {orders ? (
            <section>
              {orders.map((order, index) => (
                <div key={index} className="p-5 rounded-xl border mb-3 border-gray-400 border-opacity-25">
                  <header className="flex justify-between items-center">
                    <div>
                      <h2 className="mb-2 text-gray-400">Order ID</h2>
                      <span className="text-xl font-bold  text-gray-800">#{index + 1}</span>
                    </div>
                    
                    <button className="px-4 py-2 text-white font-semibold rounded-xl cursor-not-allowed"
                      style={{
                        backgroundColor: 
                          order.status === "Pending" ? "#FBBF24" : 
                          order.status === "Confirmed" ? "#3B82F6" :
                          order.status === "Shipped" ? "#FB923C" : 
                          "#22C55E", 
                      }}
                      disabled
                    >
                      {order.status}
                    </button>
                  </header>

                  <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                    {order.items.map((product, idx) => (
                      <div key={idx} className="border rounded-xl p-3 my-6 border-gray-400 border-opacity-25">
                        {product.product_image ? (
                          <img src={product.product_image} alt={product.product_name} className="w-full h-32 object-contain rounded-md mb-2" />
                        ) : (
                          <div className="w-full h-32 bg-gray-300 rounded-md mb-2 flex items-center justify-center">
                            <span className="text-gray-500">No Image</span>
                          </div>
                        )}
                        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 my-2">
                          {product.product_name} <span className="text-gray-500">(x{product.quantity})</span>
                        </h2>
                        <span className="text-lg">
                          <span className="font-medium text-gray-800">
                            {(Number(product.price) || 0).toFixed(2)} EGP
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="total-price my-3">
                    <p className="text-lg font-semibold">
                      Total Order Price:
                      <span className="text-primary-buttons mx-2">
                        {order.items.reduce((total, item) => total + (Number(item.price) || 0) * item.quantity, 0).toFixed(2)}
                      </span>
                      <span className="text-sm">EGP</span>
                    </p>
                  </div>
                </div>
              ))}
            </section>
          ) : (
            <Loading />
          )}
        </>
      )}
    </>
  );
}
