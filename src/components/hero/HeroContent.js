import React from "react";
import {Button} from '../../elements';

const HeroContent = () => {
  return (
    <div className="flex flex-col items-center mt-24">
      <h2 className="mb-10 text-2xl font-bold text-center text-white md:text-4xl">
        We Design Your Dream House <br /> And We Build Your Dream House
      </h2>
      <p className="mb-10 font-semibold text-center text-white">
        We know how large objects will act, but things on a <br />
        small scale just do not act that way.
      </p>
      <div className="flex items-center justify-center">
          <Button btnHeroBlue>Get Started</Button>
          <Button btnHeroOutline>Learn More</Button>
      </div>
    </div>
  );
};

export default HeroContent;
