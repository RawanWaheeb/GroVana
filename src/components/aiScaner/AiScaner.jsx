"use client";

import { useState, useRef } from "react";

export default function AiScanner() {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null); 

  const fileInputRef = useRef(null);

  const handleImageChange = (file) => {
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setImageSrc(objectURL);
      setImageFile(file);
      setAnalysisResult(null); 
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    handleImageChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    handleImageChange(file);
  };

  const handleSubmit = () => {
    if (!imageFile) return alert("Please upload an image first.");

    
    const isHealthy = Math.random() > 0.5; 

    if (isHealthy) {
      setAnalysisResult({
        status: "healthy",
        message: "🌱 Your Plant Health is Super!",
      });
    } else {
      setAnalysisResult({
        status: "unhealthy",
        message: "⚠️ Your Plant Needs Some Care!",
        advice: [
          "Ensure your plant receives the right amount of sunlight.",
          "Water your plant adequately—avoid overwatering or underwatering.",
          "Use nutrient-rich soil to help your plant grow strong.",
          "Check for pests or diseases and take action if needed.",
          "Prune dead leaves to encourage healthy growth.",
        ],
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-8 gap-6">
      
      {analysisResult && (
        <div className="mb-4 text-center px-4 py-2 bg-white shadow-lg rounded-md w-[300px]">
          <p className="text-lg font-semibold text-gray-800">
            {analysisResult.message}
          </p>
        </div>
      )}

     
      <div className="flex flex-col md:flex-row items-center justify-center gap-[200px] md:gap-0 w-full">
        
        <div className="relative w-full md:w-1/2 flex flex-col justify-center items-center">
        
          <div className="absolute w-64 h-56 sm:w-72 sm:h-64 md:w-[450px] md:h-[350px] lg:w-[500px] lg:h-[400px] bg-green-200 opacity-50 rounded-[40%] animate-moveingBorder"></div>

         
          <div className="relative w-52 h-44 sm:w-60 sm:h-52 md:w-[400px] md:h-[300px] lg:w-[450px] lg:h-[350px] bg-white rounded-[40%] shadow-lg flex items-center justify-center overflow-hidden animate-moveingBorder">
            <img
              src={imageSrc || "lovable-uploads/AiScaner.jpg"} 
              alt="Uploaded Preview"
              className="w-full h-full object-cover rounded-[40%]"
            />
          </div>
        </div>

       
        <div className="w-full md:w-1/2 flex flex-col items-center text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Scan your <span className="text-green-700">Plant</span>
          </h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Upload The Photo, Check and Learn
          </p>

        
          <div
            className="mt-6 w-72 sm:w-80 md:w-[320px] lg:w-[350px] h-36 sm:h-40 border-2 border-solid border-[#20A049] flex flex-col items-center justify-center rounded-lg bg-white shadow-md cursor-pointer transition hover:bg-gray-100"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <button className="mt-8 bg-[#2E5B41] hover:bg-[#234732] text-white px-8 py-2 text-lg transition-colors flex items-center space-x-2 gap-3 rounded-xl">
              {imageSrc ? "Upload Another Photo" : "Upload Photo"}
              <img
                src="lovable-uploads/uploadIMG.svg"
                alt="uploadIMG"
                className="w-6 h-6"
              />
            </button>
            <p className="text-black mt-2 text-sm sm:text-base">
              or drop a file
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/png, image/jpeg"
            onChange={handleFileSelect}
          />

         
          {imageSrc && (
            <button
              onClick={handleSubmit}
              className="mt-4 bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded-lg transition w-40"
            >
              Analyze Plant
            </button>
          )}
        </div>
      </div>

    
      {analysisResult?.advice && (
        <div className="mt-6 w-full max-w-3xl text-center bg-white shadow-lg rounded-md px-6 py-4">
          <p className="text-gray-700 text-sm sm:text-base font-semibold mb-2">
            Try these steps to cure your plant :
          </p>
          <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base text-left mx-auto max-w-lg">
            {analysisResult.advice.map((tip, index) => (
              <li key={index} className="mb-1">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
