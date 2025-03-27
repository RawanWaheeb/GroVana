


import { useEffect, useState, useCallback } from "react";
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
import { Helmet } from "react-helmet";
import productfound from "../../assets/images/no item.jpg";
import { debounce } from "lodash";

const API_URL = "https://mohamednowar.pythonanywhere.com/api/products/";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem("selectedCategory") || "All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("selectedCategory", selectedCategory);
  }, [selectedCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      let url = API_URL;
      const token = localStorage.getItem("accessToken")?.trim();
      if (!token) {
        setLoading(false);
        return;
      }

      const params = new URLSearchParams();
      if (selectedCategory !== "All") params.append("category", selectedCategory);
      if (searchQuery) params.append("keyword", searchQuery);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(response.data || []);
    } catch {
      setError("Failed to fetch products. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQuery]);

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 500),
    []
  );

  return (
    <>
      <Helmet>
        <title>Products</title>
        <meta name="description" content="Find the perfect plant for your space" />
      </Helmet>

      <div className="container text-center py-10">
        <h1 className="text-4xl font-bold">Our Shop</h1>
        <hr className="border-t-2 border-primary-buttons my-2 w-20 mx-auto mt-4" />
        <p className="text-gray-500 text-lg mt-4">Find the perfect plant for your space</p>

        {error && <p className="text-red-500 font-bold mt-5">{error}</p>}

        <div className="flex justify-center gap-4 mt-9">
          {["All", "Plants", "Seeds", "Pots"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full border ${
                selectedCategory === category ? "bg-primary-buttons text-white" : "border-primary-buttons text-primary-buttons"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-5 flex justify-center">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => debouncedSearch(e.target.value)}
            className="px-4 py-3 w-96 border rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-buttons"
          />
        </div>

        <div className="mt-10">
          {loading ? (
            <Loading />
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center">
              <img src={productfound} alt="No products found" className="w-1/3" />
              <p className="text-2xl font-bold text-gray-700">Sorry, no products found!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-8">
              {products.map((product) => (
                <Card key={product.slug} productInfo={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}






