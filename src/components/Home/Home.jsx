


import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AboutSection from "./aboutSection/AboutSection";
import CategorySection from "./categorySection/CategorySection";
import ContactSection from "./contactSection/ContactSection";
import FeatureSection from "./featureSection/FeatureSection";
import HeroSection from "./heroSection/heroSection";
import PlantHealthFeature from "./plantHealthFeatureSection/PlantHealthFeature";
import { ReviewSection } from "./reviewSection/ReviewSection";
import SREA from "./sreaSection/SREA";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="h-screen px-6">
        <HeroSection />
      </section>
      
      {/* Feature Section */}
      <section className="py-16">
        <FeatureSection />
      </section>

      {/* Categories Section */}
      <section id="shop" className="h-screen flex items-center py-16">
        <CategorySection />
      </section>

      {/* About Us Section */}
      <section id="about_us" className="h-screen flex items-center py-16">
        <AboutSection />
      </section>

      {/* AI Help Section */}
      <section id="ai_help" className="h-screen flex items-center py-16">
        <PlantHealthFeature />
      </section>

      {/* Contact Section */}
      <section id="content" className="h-screen flex items-center py-16">
        <ContactSection />
      </section>

      {/* Review Section */}
      <section id="review" className="h-screen flex items-center py-16">
        <ReviewSection />
      </section>
    </div>
  );
}














