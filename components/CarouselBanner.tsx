"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image"; // Use next/image for optimized image loading
import Banner1 from "../public/banners/Banner1.png";
import Banner2 from "../public/banners/Banner2.png";
import Banner3 from "../public/photos/photo2.jpg";

function AutoPlayMethods() {
  let sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const banners = [Banner1, Banner2, Banner3]; // Array of images

  return (
    <div className="slider-container gap-0 w-full  overflow-hidden">
      <Slider ref={(slider: any) => (sliderRef = slider)} {...settings}>
        {banners.map((banner, index) => (
          <div
            key={index}
            className="relative w-full h-auto xl:h-[85vh] aspect-[16/9]"
          >
            <Image
              src={banner}
              alt={`Banner ${index + 1}`}
              layout="fill" // Fill the container
              objectFit="cover" // Ensure the image covers the container
              priority // Load these images first
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default AutoPlayMethods;
