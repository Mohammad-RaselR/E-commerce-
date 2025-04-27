import React, { useState } from "react";
import img1 from "../Images/truck.png";
import img2 from "../Images/watch.png";
import img3 from "../Images/watch.png";

const images = [img1, img2, img3];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-[#f4f4f4] py-6 px-4 border-2 border-gray-100 p-2">
      <div className="bg-cyan-400 rounded-xl flex flex-col md:flex-row items-center justify-between px-8 py-10 max-w-4xl mx-auto relative">
        {/* Left Content */}
        <div className="text-left md:w-1/2">
          <p className="text-xs font-semibold tracking-widest mb-1">NEW ARRIVALS</p>
          <h2 className="text-3xl font-bold leading-tight mb-3">Hot Right Now</h2>
          <p className="text-base font-semibold mb-5">
            Maxwell Wireless Gaming Headset at{" "}
            <span className="text-black">1990.00 BDT</span>
          </p>
          <button className="bg-white text-black font-semibold py-2 px-6 rounded shadow hover:bg-gray-100 transition">
            Shop Now
          </button>
        </div>

        {/* Right Image Slider */}
        <div className="relative md:w-1/2 flex justify-center mt-6 md:mt-0">
          {/* Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-2xl z-10"
          >
            ❮
          </button>
          <img
            src={images[current]}
            alt={`Slide ${current + 1}`}
            className="h-[280px] object-contain transition-all duration-300 bg-transparent"
            style={{ backgroundColor: 'transparent' }}
          />
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-2xl z-10"
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
