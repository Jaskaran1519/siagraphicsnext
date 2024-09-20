"use client";

import { Order } from "@/lib/models/OrderModel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function MyOrders() {
  const router = useRouter();
  const { data: orders, error } = useSWR(`/api/orders/mine`);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  if (error) return "An error has occurred.";
  if (!orders) return "Loading...";

  return (
    <div className="overflow-x-auto min-h-screen">
      {orders.length == 0 ? (
        <div className="flex flex-col justify-center items-center mt-[20vh]">
          <h1 className="text-xl font-semibold "> No orders found</h1>
          <Link href="/collection" className="mt-3 hover:underline text-lg">
            Start Shopping
          </Link>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order) => (
              <tr key={order._id}>
                <td>{order._id.substring(20, 24)}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>₹{order.totalPrice}</td>
                <td>
                  {order.isPaid && order.paidAt
                    ? `${order.paidAt.substring(0, 10)}`
                    : "not paid"}
                </td>
                <td>
                  {order.isDelivered && order.deliveredAt
                    ? `${order.deliveredAt.substring(0, 10)}`
                    : "not delivered"}
                </td>
                <td>
                  <Link href={`/order/${order._id}`} passHref>
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
