import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import FeaturedProperties from "../../components/FeaturedProperties/FeaturedProperties";

import "./Homepage.css";

function Homepage() {
  return (
    <div className="homepage">
      <Navbar />

      <Hero />

      <FeaturedProperties />
    </div>
  );
}

export default Homepage;