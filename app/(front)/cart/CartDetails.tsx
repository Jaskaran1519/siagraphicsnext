"use client";

import useCartService from "@/lib/hooks/useCartStore";
import { Link2, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartDetails() {
  const router = useRouter();
  const { items, itemsPrice, decrease, increase } = useCartService();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <></>;

  return (
    <div className="max-w-[1300px] w-[90%] mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center text-xl">
          Cart is empty.{" "}
          <Link href="/" className="text-blue-500 underline">
            Go shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="overflow-x-auto lg:col-span-2">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-700">Item</th>
                  <th className="py-3 px-4 text-center text-gray-700 md:table-cell hidden">
                    Quantity
                  </th>
                  <th className="py-3 px-4 text-gray-700 text-center">Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-4 px-4 flex flex-col gap-3 md:flex-row items-start md:items-center">
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center "
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-lg border border-gray-300"
                        />
                      </Link>
                      <div className="text-gray-800 text-xl">
                        <Link href={`/product/${item.slug}`}>
                          <div className="line-clamp-1 font-semibold">
                            {item.name.toUpperCase()}
                          </div>
                        </Link>
                        <div className="text-gray-600 flex gap-2 text-sm">
                          {item.size} {item.color}{" "}
                          {item.design && (
                            <a href={item.design} target="_blank">
                              <Link2 />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Quantity section for mobile screens */}
                      <div className="flex items-center justify-center mt-4 md:hidden">
                        <button
                          className="p-1 rounded-full bg-gray-200 mx-1"
                          type="button"
                          onClick={() => decrease(item)}
                        >
                          <Minus />
                        </button>
                        <span className="px-2 text-xl">{item.qty}</span>
                        <button
                          className="p-1 rounded-full bg-gray-200 mx-1"
                          type="button"
                          onClick={() => increase(item)}
                        >
                          <Plus />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center hidden md:table-cell">
                      <div className="flex items-center justify-center">
                        <button
                          className="p-1 rounded-full bg-gray-200 mx-1"
                          type="button"
                          onClick={() => decrease(item)}
                        >
                          <Minus />
                        </button>
                        <span className="px-2 text-xl">{item.qty}</span>
                        <button
                          className="p-1 rounded-full bg-gray-200 mx-1"
                          type="button"
                          onClick={() => increase(item)}
                        >
                          <Plus />
                        </button>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-xl text-center text-gray-800">
                      ₹{(item.price + (item.design ? 500 : 0)) * item.qty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex text-center flex-col bg-white shadow-md rounded-lg border border-gray-200 p-4">
            <div className="text-xl font-semibold mt-5 ">
              Total Items in cart = {items.reduce((a, c) => a + c.qty, 0)}
            </div>
            <div className="text-xl mb-4">Subtotal : ₹{itemsPrice}</div>
            <h1 className="my-3 text-sm">
              *Coupon codes can be added at the checkout page
            </h1>
            <button
              onClick={() => router.push("/shipping")}
              className="btn bg-zinc-900 hover:bg-black text-white w-full"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
