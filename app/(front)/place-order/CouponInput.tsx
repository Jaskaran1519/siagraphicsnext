import couponService from "@/lib/services/couponService";
import React from "react";

const CouponInput = async () => {
  const latestCoupons = await couponService.getLatest();
  console.log(latestCoupons);

  return (
    <div className=" mt-5 flex justify-between items-center">
      <div>Coupon code</div>
      <input
        type="text"
        className="w-1/2 border-[1px] py-1 border-black rounded-md"
      />
    </div>
  );
};

export default CouponInput;
