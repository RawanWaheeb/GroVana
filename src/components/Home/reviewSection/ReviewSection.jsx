
import { useState, useEffect } from "react";
import axios from "axios";

export const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

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

    const intervalId = setInterval(fetchReviews, 60000); 

    return () => clearInterval(intervalId);
  }, []);


  useEffect(() => {
    const changeInterval = setInterval(() => {
      setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 4000); 

    return () => clearInterval(changeInterval);
  }, [reviews.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  return (
    <div className="w-full">
      <div className="py-12 md:py-24 bg-[#F2FCE2] md:w-[60%] md:float-right md:h-[80%] relative w-full h-auto">
        {reviews.length > 0 && (
          <img
            src={reviews[activeIndex].image || "lovable-uploads/comment.png"}
            alt="comment"
            // className="hidden md:block absolute h-[80%] top-[10%] left-[-150px]"
            className="hidden md:block absolute top-[10%] left-[-150px] w-[200px] h-[350px] object-cover rounded-lg"
          />
        )}

        <h2 className="text-3xl md:text-4xl text-center mb-8 md:mb-16 text-[#142718] w-full font-[lora] md:top-[-20px] relative md:absolute">
          What Our Clients Say
        </h2>

        <div className="container mx-auto px-4 md:pl-40">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {reviews.map((review, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>

            {/* <div className="hidden md:block">
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white transition-colors"
                aria-label="Previous review"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white transition-colors"
                aria-label="Next review"
              >
                →
              </button>
            </div> */}

            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-3 w-3 rounded-full transition-colors ${
                    index === activeIndex ? "bg-[#2E5B41]" : "bg-gray-300"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReviewCard = ({ review }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start p-15 md:p-8">
      <div className="flex-1 space-y-3 md:space-y-4">
        <h3 className="text-xl md:text-2xl font-semibold">{review.user_full_name}</h3>
        <p className="text-gray-700 leading-relaxed text-sm md:text-base">
          {review.review}
        </p>
        <p className="text-gray-500 text-xs md:text-sm">{review.date}</p>
      </div>
    </div>
  );
};


