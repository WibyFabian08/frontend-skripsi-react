import Navbar from "../Navbar";
import HeroContent from "./HeroContent";

const Hero = () => {
  return (
    <div className="relative h-screen hero">
      <div className="container flex flex-col h-full mx-auto overflow-hidden">
        <div className="absolute inset-0 z-10 hero-overlay">
          <Navbar></Navbar>
          <HeroContent></HeroContent>
        </div>
      </div>
    </div>
  );
};

export default Hero;
