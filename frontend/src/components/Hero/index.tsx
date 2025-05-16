import React, { useState, useEffect } from 'react';
import Button from '../Button';

const heroImages = [
  {
    url: '/assets/hero1.jpg',
    alt: 'Students working'
  },
  {
    url: '/assets/hero2.jpg',
    alt: 'Professional development'
  },
  {
    url: '/assets/hero3.jpg',
    alt: 'Digital classroom'
  },
  {
    url: '/assets/hero1.jpg',
    alt: 'Online education'
  }
];

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative h-96 md:h-screen max-h-[600px] overflow-hidden">
      {/* Single Image Carousel */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        <img
          src={heroImages[currentImageIndex].url}
          alt={heroImages[currentImageIndex].alt}
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-end text-center text-white px-4 pb-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Get Started Digital Learning
        </h1>
        <Button primary className="mt-6">Get Started</Button>
      </div>
    </div>
  );
};

export default Hero;