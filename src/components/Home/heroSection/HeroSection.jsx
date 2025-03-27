


import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../../Context/User.context"; 

export default function HeroSection() {
  const { token } = useContext(userContext); 
  const navigate = useNavigate();


  const handleShopNowClick = () => {
    if (token) {
      console.log("✅ User is logged in. Redirecting to /Products...");
      navigate("/Products");
    } else {
      console.log("🚨 User is NOT logged in. Redirecting to /login...");
      navigate("/login"); 
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-0 justify-items-center items-center px-4 md:px-8 lg:px-16 ">
    
      <div className="flex flex-col gap-4 md:gap-6 max-w-2xl order-2 md:order-1">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-[lora] text-center md:text-left">
          Make Your Home <span className="text-[#2E5B41]">Green</span>
        </h1>

        <p className="text-base md:text-lg text-gray-600 text-center md:text-left font-[Nunito Sans] mx-auto md:mx-0 max-w-[500px]">
          GroVana offers a thoughtfully curated collection of plants, from the
          most diverse to the hardiest species. Each plant is handled with care
          and supported by our AI-powered tools, ready to bring nature&apos;s
          beauty and tranquility into your space.
        </p>

        <div className="flex justify-center md:justify-start">
         
          <button
            onClick={handleShopNowClick}
            className="bg-[#2E5B41] hover:bg-[#234732] text-white rounded-full px-6 py-2 md:px-8 md:py-3 text-base md:text-lg transition-colors w-fit"
          >
            Shop Now
          </button>
        </div>
      </div>

      
      <div className="relative w-full max-w-[600px] order-1 md:order-2 mt-4 md:mt-0">
        <img
          src="/lovable-uploads/a86714c1-43fb-434f-842b-58d1ab81d2f6.png"
          alt="Plants in white pots"
          className="w-full h-auto object-contain rounded-b-[20px] md:rounded-b-[40px]"
        />
      </div>
    </div>
  );
}











