/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import axios from "axios";
import { FaCamera } from 'react-icons/fa';

const UploadPost = ({ onCreatePost }) => {
  const [postContent, setPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const token = localStorage.getItem("accessToken");
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Token:", token);
      console.log("Selected Image:", selectedImage);

      const formData = new FormData();
      formData.append("post_name", userProfile.username);
      formData.append("content", postContent);

      if (selectedImage) {
        formData.append("image", selectedImage, selectedImage.name);
      }

      const response = await axios.post(
        "https://mohamednowar.pythonanywhere.com/api/posts/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Post Response:", response.data);

      setPostContent("");
      setSelectedImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      onCreatePost(response.data);
    } catch (e) {
      console.error("Error uploading post:", e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="bg-white w-full max-w-[600px] mx-auto rounded-lg p-4 shadow-md "
    >
      <div className="flex items-center gap-2 md:gap-4">
        <img
          src={userProfile.image || "lovable-uploads/profile.png"}
          alt="Profile"
          className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <input
            type="text"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What's growing on?"
            className="w-full border-none outline-none text-gray-800 p-1.5 md:p-2 rounded-lg text-sm md:text-base"
            required
          />
        </div>
      </div>

      {selectedImage && (
        <div className="my-4 mx-auto max-w-full">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            className="max-h-96 w-full object-cover rounded-lg"
          />
        </div>
      )}

      <div className="flex flex-wrap justify-between items-center mt-4 gap-2">
        <div className="flex items-center gap-2 md:gap-4">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="flex items-center gap-1 md:gap-2 text-gray-600 cursor-pointer hover:text-green-600 text-sm md:text-base"
          >
            <FaCamera className="w-5 h-5" />
            <span>Add Photo</span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 md:px-6 md:py-2 rounded-full hover:bg-green-700 transition-colors text-sm md:text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default UploadPost;




