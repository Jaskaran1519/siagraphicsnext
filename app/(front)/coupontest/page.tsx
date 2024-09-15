import couponService from "@/lib/services/couponService";
import React from "react";

const CouponInput = async () => {
  const latestCoupons = await couponService.getLatest();
  console.log(latestCoupons);

  return <div></div>;
};

export default CouponInput;
