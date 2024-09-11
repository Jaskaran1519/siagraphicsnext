import { Metadata } from "next";
import MyOrders from "./MyOrders";

export const metadata: Metadata = {
  title: "Order History",
};
export default function OrderHistory() {
  return (
    <div className="w-[90%] mx-auto max-w-[1300px]">
      <h1 className="text-2xl font-semibold py-2">Order History</h1>
      <MyOrders />
    </div>
  );
}
