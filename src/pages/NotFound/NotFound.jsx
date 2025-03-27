import { Helmet } from "react-helmet";
import error from "../../assets/images/error.svg";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
        <meta name="description" content=" Not Found Page" />
      </Helmet>

      <div className="w-full flex flex-col items-center justify-center h-[80vh] px-4 text-center">
       
        <img className="w-full max-w-xs sm:max-w-md md:max-w-lg h-auto" src={error} alt="Error 404" />

      
        <h2 className="text-xl sm:text-2xl md:text-3xl text-primary-600 font-bold mt-4">
          This page does not exist. Please check the path.
        </h2>

        
        <Link 
          to="/" 
          className="text-lg sm:text-xl font-bold text-white bg-primary-700 px-12 py-3 mt-12  rounded-lg hover:bg-primary-600 transition-all"
        >
          Go To Home Page
        </Link>
      </div>
    </>
  );
}
