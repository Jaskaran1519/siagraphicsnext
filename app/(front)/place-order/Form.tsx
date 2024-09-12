"use client";
import CheckoutSteps from "@/components/CheckoutSteps";
import useCartService from "@/lib/hooks/useCartStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import Image from "next/image";

const Form = () => {
  const router = useRouter();
  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    clear,
  } = useCartService();

  const { trigger: placeOrder, isMutating: isPlacing } = useSWRMutation(
    `/api/orders/mine`,
    async (url) => {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethod,
          shippingAddress,
          items,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        clear();
        toast.success("Almost there, just pay and we good", { duration: 5000 });
        return router.push(`/order/${data.order._id}`);
      } else {
        toast.error(data.message);
      }
    }
  );
  useEffect(() => {
    if (!paymentMethod) {
      return router.push("/payment");
    }
    if (items.length === 0) {
      return router.push("/");
    }
  }, [paymentMethod, router]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [items.length]);

  if (!mounted) return <></>;

  return (
    <div className="max-w-[1300px] mx-auto w-[90%] ">
      <CheckoutSteps current={4} />

      <div className="md:flex justify-between mt-10">
        <div className="md:w-[50%]">
          <div className="cart">
            <h2 className="text-2xl font-semibold">Ordered Items</h2>
            {items.map((item, index: any) => (
              <div
                key={index}
                className="flex items-center justify-between py-4 px-2 mt-2 border-b border-gray-200"
              >
                <Link
                  href={`/product/${item.slug}`}
                  className="flex items-center space-x-4 w-full"
                >
                  <div className="relative w-20 h-20 rounded-xl">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-lg border border-gray-300"
                    />
                    <div className="w-6 h-6 rounded-full bg-red-700 text-white absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                      {item.qty}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-xl line-clamp-1 font-semibold text-gray-800 ">
                      {item.name.toUpperCase()}
                    </h1>
                    <h2 className="text-sm mt-1 text-gray-600">
                      ({item.size} {item.color})
                    </h2>
                  </div>
                </Link>
                <div className="text-right w-24">
                  <p className="text-gray-600 font-semibold">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="my-8">
            <div className="flex justify-between items-center">
              <h2 className="card-title ">Shipping Address</h2>
              <Link
                className="px-3 py-1 rounded-lg border-zinc-700  text-md border-[1px]"
                href="/shipping"
              >
                Edit
              </Link>
            </div>
            <p className="mt-3">{shippingAddress.fullName}</p>
            <p>{shippingAddress.mobileNumber}</p>
            <p>
              {shippingAddress.address}, {shippingAddress.city},{" "}
              {shippingAddress.postalCode}, {shippingAddress.country}{" "}
            </p>
          </div>

          <div className=" my-8">
            <div className="flex justify-between items-center">
              <h2 className="card-title">Payment Method</h2>
              <Link
                className="px-3 py-1 rounded-lg border-zinc-700  text-md border-[1px]"
                href="/payment"
              >
                Edit
              </Link>
            </div>
            <p className="mt-2">{paymentMethod}</p>
          </div>
        </div>

        <div className="w-full md:w-[40%] h-auto py-5 max-h-[400px] px-5 md:px-10 rounded-2xl shadow-xl mt-10 md:mt-0">
          <h2 className="text-xl font-semibold mt-5 text-center">
            Order Summary
          </h2>
          <ul className="space-y-3 mt-5">
            <li>
              <div className=" flex justify-between">
                <div>Items</div>
                <div>₹{itemsPrice}</div>
              </div>
            </li>
            <li>
              <div className=" flex justify-between">
                <div>Tax</div>
                <div>₹{taxPrice}</div>
              </div>
            </li>
            <li>
              <div className=" flex justify-between">
                <div>Shipping</div>
                <div>₹{shippingPrice}</div>
              </div>
            </li>
            <li>
              <div className=" flex justify-between">
                <div>Total</div>
                <div>₹{totalPrice}</div>
              </div>
            </li>

            <li>
              <button
                onClick={() => placeOrder()}
                disabled={isPlacing}
                className="btn btn-primary w-full mt-2"
              >
                {isPlacing && <span className="loading loading-spinner"></span>}
                Place Order
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Form;
