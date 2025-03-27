








import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setIsLoggedIn(true); 
    }
  }, []);


  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId); 
    if (section) {
      section.scrollIntoView({ behavior: "smooth" }); 
    }
  };

  return (
    <footer className="text-white py-8 bg-primary">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start">
            <img
              src="../../src/assets/images/logo.png"
              alt="Grovana Storee Logo"
              className="w-40"
            />
          </div>

          <div>
            <h5 className="font-bold mb-3 text-xl">Links :</h5>
            <ul className="space-y-2">
              {["Home", "Shop", "About Us", "AI Help", "Community"].map((link, index) => (
                <li key={index}>
                  <button
                    onClick={(e) => {
                      if (isLoggedIn) {
                        
                        if (link === "Shop") {
                          navigate("/Products"); 
                        } else if (link === "Community") {
                          navigate("/community"); 
                        } else if (link === "AI Help") {
                          navigate("/ai_help"); 
                        } else if (link === "About Us") {
                          scrollToSection(e, "about_us"); 
                        }
                        else if (link === "Home") {
                          navigate("/"); 
                        }
                        
                      } else {
                        
                        if (link === "Shop" || link === "AI Help" || link === "Community") {
                          navigate("/login");
                        } else if (link === "About Us") {
                          scrollToSection(e, "about_us"); 
                        } else {
                          scrollToSection(e, link.toLowerCase().replace(" ", "")); 
                        }
                      }
                    }}
                    className="text-white block transition duration-1000 ease-in-out transform hover:translate-x-2 hover:scale-105 hover:text-primary-buttons"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-3 text-xl">Contact Us :</h5>
            <div className="space-y-4 cursor-pointer">
              <p className="flex items-center justify-center md:justify-start space-x-2 hover:text-primary-buttons transition duration-1000">
                <i className="fa fa-phone hover:text-primary-buttons"></i>
                <span>+20 0100 300 1333</span>
              </p>
              <p className="flex items-center justify-center md:justify-start space-x-2 hover:text-primary-buttons transition duration-1000">
                <i className="fa fa-map-marker hover:text-primary-buttons"></i>
                <span>310 E 67th St, 6 October</span>
              </p>
              <p className="flex items-center justify-center md:justify-start space-x-2 hover:text-primary-buttons transition duration-1000">
                <i className="fas fa-clock hover:text-primary-buttons"></i>
                <span>Monday - Saturday : 9 AM - 9 PM</span>
              </p>
            </div>
          </div>

          <div>
            <h5 className="font-bold mb-3 text-xl">Follow Us :</h5>
            <div className="flex justify-center md:justify-start space-x-4 text-lg">
              {[
                { icon: "fab fa-twitter", link: "https://x.com/" },
                { icon: "fab fa-whatsapp", link: "https://web.whatsapp.com/" },
                { icon: "fab fa-facebook", link: "https://www.facebook.com/index.php/?lang=fa" },
                { icon: "fab fa-instagram", link: "https://www.instagram.com/" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className="text-xl text-white transition duration-1000 ease-in-out transform hover:scale-150 hover:text-primary-buttons active:primary-buttons"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


