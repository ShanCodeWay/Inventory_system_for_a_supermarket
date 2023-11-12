import React, { useState, useEffect } from 'react';
import './ImageSlider.css';
import p1 from './SliderImages/I1.jpg';
import p2 from './SliderImages/I2.jpg';
import p3 from './SliderImages/I3.jfif';
import p4 from './SliderImages/I4.webp';
import p5 from './SliderImages/I5.webp';
import p6 from './SliderImages/I6.jfif';
import p7 from './SliderImages/I7.png';
import p8 from './SliderImages/I8.jfif';
import p9 from './SliderImages/I11.jpg';
import p10 from './SliderImages/I10.jfif';

const images                                        = [p1, p2, p3, p4, p5, p6, p7, p8,p9, p10];

const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex]   = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval                                  = setInterval(nextImage, 2500); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className                                  = "image-slider">
      <div className                                = "slider-container">
        <div className                              = "image-container">
          <img
            src                                     = {images[currentImageIndex]}
            alt                                     = {`Image ${currentImageIndex + 1}`}
            className                               = "slider-image-cart"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
