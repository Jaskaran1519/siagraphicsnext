import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import OrderModel, { OrderItem } from "@/lib/models/OrderModel";
import ProductModel from "@/lib/models/ProductModel";
import { round2 } from "@/lib/utils1";

const calcPrices = (orderItems: OrderItem[], discountAmount: number) => {
  const itemsPrice = round2(
    orderItems.reduce((acc, item) => {
      const basePrice = item.price;
      const designPrice = item.design ? 500 : 0;
      return acc + (basePrice + designPrice) * item.qty;
    }, 0)
  );
  const shippingPrice = 150;
  const taxPrice = 0;
  const totalPrice = round2(
    itemsPrice + shippingPrice + taxPrice - discountAmount
  );
  return { itemsPrice, shippingPrice, taxPrice, totalPrice, discountAmount };
};

export const POST = auth(async (req: any) => {
  if (!req.auth) {
    return Response.json(
      { message: "unauthorized" },
      {
        status: 401,
      }
    );
  }
  const { user } = req.auth;
  try {
    const payload = await req.json();
    await dbConnect();
    const dbProductPrices = await ProductModel.find(
      {
        _id: { $in: payload.items.map((x: { _id: string }) => x._id) },
      },
      "price"
    );
    const dbOrderItems = payload.items.map((x: { _id: string }) => ({
      ...x,
      product: x._id,
      price: dbProductPrices.find((x) => x._id === x._id).price,
      _id: undefined,
    }));

    const discountAmount = payload.discountApplied || 0; // Get discount from payload or default to 0
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calcPrices(
      dbOrderItems,
      discountAmount
    );

    const newOrder = new OrderModel({
      items: dbOrderItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      discountApplied: discountAmount,
      shippingAddress: payload.shippingAddress,
      paymentMethod: payload.paymentMethod,
      user: user._id,
    });

    const createdOrder = await newOrder.save();
    return Response.json(
      { message: "Order has been created", order: createdOrder },
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
