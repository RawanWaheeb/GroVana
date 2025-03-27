import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import Loading from "../../components/Loading/Loading";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageVersion, setImageVersion] = useState(0); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("https://mohamednowar.pythonanywhere.com/api/profile/", {
          method: "GET",
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        });
  
        if (!response.ok) throw new Error("Failed to fetch profile");
  
        const data = await response.json();
        setUserData(data);
        localStorage.setItem("userProfile", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfile();

    const checkLocalStorage = () => {
      const storedUser = JSON.parse(localStorage.getItem("userProfile"));
      if (storedUser) setUserData(storedUser);
    };
    
    window.addEventListener('storage', checkLocalStorage);
    return () => window.removeEventListener('storage', checkLocalStorage);
  }, [navigate]); 
  
  const profileImage = userData?.image 
    ? `${userData.image}?v=${imageVersion}`
    : "http://127.0.0.1:8000/media/profile_images/default.jpg";

  if (loading) {
    return <Loading />;
  }

  return (
    <>
    <Helmet>
      <title>Profile</title>
      <meta name="description" content="Profile page" />
    </Helmet>
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="border-2 border-primary-buttons bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg text-center">
        <div className="relative w-32 h-32 mx-auto">
          <div className="w-32 h-32 rounded-full border-4 bg-gray-200 flex justify-center items-center">
            <img 
              src={profileImage}  
              alt="Profile" 
              className="w-32 h-32 rounded-full object-cover" 
              onError={(e) => { e.target.src = "http://127.0.0.1:8000/media/profile_images/default.jpg"; }}
            />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mt-4 text-primary-buttons">{userData?.username || "User"} </h2>
        <h2 className="text-primary-buttons flex items-center mt-4 mb-12 font-bold text-xl">About</h2>
        <div className="mt-6 text-left space-y-6">
          <p className="text-gray-700 flex items-center gap-4 font-bold">
            <FaVenusMars className="text-primary-buttons text-2xl" /> {userData?.gender || "Not specified"}
          </p>
          <hr className="border-gray-300" />
          <p className="text-gray-700 flex items-center gap-4 font-bold">
            <FaBirthdayCake className="text-primary-buttons text-2xl" /> {userData?.date_of_birth || "Not specified"}
          </p>
          <hr className="border-gray-300" />
          <p className="text-gray-700 flex items-center gap-4 font-bold">
            <FaEnvelope className="text-primary-buttons text-2xl" /> {userData?.email || "Not specified"}
          </p>
          <hr className="border-gray-300" />
          <p className="text-gray-700 flex items-center gap-4 font-bold">
            <FaPhone className="text-primary-buttons text-2xl" />
            {userData?.phone || userData?.phone_number || "Not specified"}
          </p>
        </div>
        <div className="flex justify-center mt-12 gap-4">
          <button 
            className="bg-primary-buttons hover:bg-primary text-white hover:text-black px-6 py-2 rounded-full font-medium transition shadow-md"
            onClick={() => navigate("/UpdateProfile")}
          >
            Update Your Data
          </button>
          <button className="bg-primary-buttons hover:bg-primary text-white hover:text-black px-6 py-2 rounded-full font-medium transition shadow-md">
            Change Password
          </button>
        </div>
      </div>
    </div>
  </>
  );
};

export default Profile;