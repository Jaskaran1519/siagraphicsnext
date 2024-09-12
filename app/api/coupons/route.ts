import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/dbConnect";
import CouponModel from "@/lib/models/CouponModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await connectDB(); // Connect to the database

    const coupons = await CouponModel.find(); // Fetch all coupons

    if (!coupons || coupons.length === 0) {
      return res.status(200).json({ coupons: [] }); // Return an empty array if no coupons
    }

    res.status(200).json({ coupons }); // Return coupons if found
  } catch (err: any) {
    console.error("Error fetching coupons:", err);
    res
      .status(500)
      .json({ message: "Error fetching coupons", error: err.message });
  }
}
