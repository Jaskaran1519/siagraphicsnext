import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import CouponModel from "@/lib/models/CouponModel";

export const GET = auth(async (...args: any) => {
  const [req, { params }] = args;
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: "unauthorized" },
      {
        status: 401,
      }
    );
  }
  await dbConnect();
  const coupon = await CouponModel.findById(params.id);
  if (!coupon) {
    return Response.json(
      { message: "coupon not found" },
      {
        status: 404,
      }
    );
  }
  return Response.json(coupon);
}) as any;

export const PUT = auth(async (...args: any) => {
  const [req, { params }] = args;
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: "unauthorized" },
      {
        status: 401,
      }
    );
  }

  const {
    code,
    discountType,
    discountValue,
    minimumSpend,
    startDate,
    endDate,
  } = await req.json();

  try {
    await dbConnect();

    const coupon = await CouponModel.findById(params.id);
    if (coupon) {
      coupon.code = code;
      coupon.discountType = discountType;
      coupon.discountValue = discountValue;
      coupon.minimumSpend = minimumSpend;
      coupon.startDate = startDate;
      coupon.endDate = endDate;

      const updatedCoupon = await coupon.save();
      return Response.json(updatedCoupon);
    } else {
      return Response.json(
        { message: "Coupon not found" },
        {
          status: 404,
        }
      );
    }
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    );
  }
}) as any;

export const DELETE = auth(async (...args: any) => {
  const [req, { params }] = args;

  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: "unauthorized" },
      {
        status: 401,
      }
    );
  }

  try {
    await dbConnect();
    const coupon = await CouponModel.findById(params.id);
    if (coupon) {
      await coupon.deleteOne();
      return Response.json({ message: "Coupon deleted successfully" });
    } else {
      return Response.json(
        { message: "Coupon not found" },
        {
          status: 404,
        }
      );
    }
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    );
  }
}) as any;
