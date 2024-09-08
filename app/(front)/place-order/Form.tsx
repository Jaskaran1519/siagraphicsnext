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
        toast.success("Order placed successfully");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod, router]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <div className="max-w-[1300px] mx-auto w-[90%] ">
      <CheckoutSteps current={4} />

      <div className="shadow-xl border-t-[4px] border-yellow-400 rounded-xl mt-10 my-5">
        <div className="card-body">
          <h2 className="text-3xl font-semibold">Items</h2>
          <table className="table">
              {items.map((item) => (
                <div key={item.slug}>
                  <div>
                    <Link
                      href={`/product/${item.slug}`}
                      className="flex items-center"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                      ></Image>
                      <span className="px-2">
                        {item.name}({item.color} {item.size})
                      </span>
                    </Link>
                  </div>
                  <p>
                    {item.qty}
                  </p>
                  <p>${item.price}</p>
                  <div>
                    <Link className="btn" href="/cart">
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-x-4 gap-y-5 my-5">
        <div className="shadow-xl border-t-[4px] border-yellow-400 rounded-xl h-full">
          <div className="card-body">
            <h2 className="card-title">Shipping Address</h2>
            <p>{shippingAddress.fullName}</p>
            <p>
              {shippingAddress.address}, {shippingAddress.city},{" "}
              {shippingAddress.postalCode}, {shippingAddress.country}{" "}
            </p>
            <div>
              <Link className="btn" href="/shipping">
                Edit
              </Link>
            </div>
          </div>
        </div>

        <div className="shadow-xl border-t-[4px] border-yellow-400 rounded-xl h-full">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="card-title">Payment Method</h2>
              <Link
                className="px-3 py-1 rounded-lg border-zinc-700  text-md border-[1px]"
                href="/payment"
              >
                Edit
              </Link>
            </div>
            <p>{paymentMethod}</p>
          </div>
        </div>
      </div>

      <div>
        <div className="card bg-base-300">
          <div className="card-body">
            <h2 className="card-title">Order Summary</h2>
            <ul className="space-y-3">
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
                  className="btn btn-primary w-full"
                >
                  {isPlacing && (
                    <span className="loading loading-spinner"></span>
                  )}
                  Place Order
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Form;
