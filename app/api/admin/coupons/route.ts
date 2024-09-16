import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import CouponModel from "@/lib/models/CouponModel";

export const GET = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: "unauthorized" },
      {
        status: 401,
      }
    );
  }
  await dbConnect();
  const coupons = await CouponModel.find();
  return Response.json(coupons);
}) as any;

export const POST = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: "unauthorized" },
      {
        status: 401,
      }
    );
  }
  await dbConnect();
  const coupon = new CouponModel({
    code: "XXXXX",
    discountType: "amount",
    discountValue: "500",
    minimumSpend: "4000",
    usedCount: "0",
    expiryDate: new Date(),
    isActive: true,
  });
  try {
    await coupon.save();
    return Response.json(
      { message: "Coupon created successfully", coupon },
      {
        status: 201,
      }
    );
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    );
  }
}) as any;
