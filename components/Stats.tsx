import Image from "next/image";
import React from "react";

const Stats = () => {
  return (
    <div className="w-full py-16 bg-zinc-800">
      <div className="w-[90%] max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <div className="flex flex-row xl:flex-col  items-center gap-4">
          <div className="p-2 border-[2px] border-white rounded-full">
            <Image src="/whitelogo.png" width={50} height={50} alt="" />
          </div>
          <div className="xl:text-center">
            <h1 className="text-xl text-gray-100 my-2 font-semibold">
              Professional Service
            </h1>
            <h1 className="text-md text-white">
              Efficient Customer Support from a Passionate team
            </h1>
          </div>
        </div>

        <div className="flex flex-row xl:flex-col  items-center gap-4">
          <div className="p-2 border-[2px] border-white rounded-full">
            <Image src="/whitelogo.png" width={50} height={50} alt="" />
          </div>
          <div className="xl:text-center">
            <h1 className="text-xl text-gray-100 my-2 font-semibold">
              Secure Payments
            </h1>
            <h1 className="text-md text-white">
              All types of secure payment methods
            </h1>
          </div>
        </div>

        <div className="flex flex-row xl:flex-col  items-center gap-4">
          <div className="p-2 border-[2px] border-white rounded-full">
            <Image src="/whitelogo.png" width={50} height={50} alt="" />
          </div>
          <div className="xl:text-center">
            <h1 className="text-xl text-gray-100 my-2 font-semibold">
              Fast Delivery
            </h1>
            <h1 className="text-md text-white">
              Fast Door to Door delivery Service
            </h1>
          </div>
        </div>

        <div className="flex flex-row xl:flex-col  items-center gap-4">
          <div className="p-2 border-[2px] border-white rounded-full">
            <Image src="/whitelogo.png" width={50} height={50} alt="" />
          </div>
          <div className="xl:text-center">
            <h1 className="text-xl text-gray-100 my-2 font-semibold">
              Quality & Savings
            </h1>
            <h1 className="text-md text-white">
              Comprehensive Quality Control and Affordable Prices
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
