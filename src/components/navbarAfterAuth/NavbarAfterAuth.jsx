"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  ScanLine,
  Menu,
  X,
  User,
  LogOut,
} from "lucide-react";
import axios from "axios";

export default function NavbarAfterAuth() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewContent, setReviewContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("https://mohamednowar.pythonanywhere.com/api/reviews/");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();

    const intervalId = setInterval(fetchReviews, 60000); // Poll every 60 seconds

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    console.log("🔴 Logout button clicked!");

    localStorage.removeItem("accessToken"); 
    localStorage.removeItem("userToken");  
    localStorage.removeItem("userData");  

    setIsDropdownOpen(false); 

    window.dispatchEvent(new Event("authChange")); 

    console.log("✅ Redirecting to Login Page...");

    setTimeout(() => {
      window.location.replace("/login"); 
    }, 100);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append("review", reviewContent);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const response = await axios.post(
        "https://mohamednowar.pythonanywhere.com/api/reviews/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Review submitted:", response.data);
      setIsModalOpen(false);
      setReviewContent("");
      setSelectedImage(null);

      // Fetch the latest reviews after successful submission
      const updatedReviews = await axios.get("https://mohamednowar.pythonanywhere.com/api/reviews/");
      setReviews(updatedReviews.data);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-4 transition-all duration-300">
        <div className="hidden md:flex items-center gap-4">
          {[
            { icon: <ShoppingCart size={20} />, text: "Cart", action: () => navigate("/cart") },
            { icon: <Heart size={20} />, text: "Wishlist", action: () => navigate("/wishlist") },
            { icon: <ScanLine size={20} />, text: "Scanner", action: () => navigate("/ai_help") }
          ].map((item, index) => (
            <div
              key={index}
              onClick={item.action}
              className="flex items-center gap-2 cursor-pointer transform transition-transform hover:scale-105"
            >
              <div className="p-2 bg-[#2E5B41] text-white rounded-full">
                {item.icon}
              </div>
              <span className="text-gray-700 font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center transition-transform duration-300 hover:scale-110">
          <img
            src="lovable-uploads/logo.png"
            alt="Grovana Logo"
            className="h-12 md:h-16 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        <div className="hidden md:flex items-center gap-6 text-gray-700 font-semibold">
          {[
            { name: "Home", action: () => navigate("/") },
            { name: "Shop", action: () => navigate("/Products") },
            { name: "About Us", action: () => navigate("/", { state: { scrollTo: "about_us" } }) },
            { name: "Community", action: () => navigate("/community") },
            { name: "Review", action: () => setIsModalOpen(true) },
          ].map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="block py-2 text-lg transform transition-transform hover:scale-105 cursor-pointer hover:text-green-700"
            >
              {item.name}
            </button>
          ))}

          <div className="relative">
            <img
              src="lovable-uploads/AiScaner.jpg"
              alt="User"
              className="w-10 h-10 rounded-full object-cover cursor-pointer transition-transform hover:scale-110"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition w-full text-left"
                >
                  <User size={18} /> Profile
                </button>
                <button
                  onClick={handleLogout} 
                  className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-gray-100 transition"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Submit a Review</h2>
            <form onSubmit={handleReviewSubmit}>
              <textarea
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                placeholder="Write your review..."
                className="w-full p-2 border rounded mb-4"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files[0])}
                className="mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}








































