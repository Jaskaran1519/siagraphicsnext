import Image from "next/image";
import React from "react";

const SizeChart = () => {
  return (
    <div className="w-full my-16 relative md:flex justify-between gap-10 items-start">
      <Image
        src="/sizechart.png"
        width={800}
        height={800}
        className="w-full md:w-[40%] rounded-lg shadow-lg sticky top-10"
        alt="Size Chart"
      />

      <div className="w-full md:w-1/2 mt-5 md:mt-0 md:text-left">
        <p className="text-lg md:text-xl xl:text-[2rem] xl:leading-relaxed font-medium leading-relaxed">
          Introducing our <span className="font-bold">Lift Lock Belts</span>,
          designed for strength and comfort with precision sizing to ensure the
          perfect fit.
          <br />
          Our size chart covers every need, from small to extra-large, so you
          can focus on your lifts with confidence. Whether you're a beginner or
          a pro, we have got you covered with the ideal size for unbeatable
          support during every workout.
          <br />
          <br />
          <span className="font-bold text-xl">
            Choose your ideal size and lift with confidence!
          </span>
        </p>
      </div>
    </div>
  );
};

export default SizeChart;
