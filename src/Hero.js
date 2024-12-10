// Hero.js
import React from 'react';
import { FaArrowDown } from 'react-icons/fa'; // Hvis du bruger ikonet

const Hero = ({
  title,
  subtitle,
  backgroundImage,
  backgroundVideo,
  scrollToId,
  children,
}) => (
  <section
    className="relative bg-cover bg-center text-white h-[95vh]" // Ændret højde her
    style={{
      backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
    }}
  >
    {/* Video Baggrund */}
    {backgroundVideo && (
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={backgroundVideo}
        autoPlay
        loop
        muted
        poster="/assets/images/hero-bg.jpg"
      ></video>
    )}

    {/* Overlejring */}
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

    {/* Indhold */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">{title}</h1>
      <p className="text-xl md:text-2xl mb-8">{subtitle}</p>
      {children}
    </div>

    {/* Hoppende Pil */}
    {scrollToId && (
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <a
          href={`#${scrollToId}`}
          className="text-white text-6xl animate-bounce inline-block"
        >
          {/* Brug ikonet eller tekst */}
          <FaArrowDown />
        </a>
      </div>
    )}
  </section>
);

export default Hero;
