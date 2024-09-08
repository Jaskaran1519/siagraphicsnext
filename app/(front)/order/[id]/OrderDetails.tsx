"use client";
import { OrderItem } from "@/lib/models/OrderModel";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import Loader from "@/components/Loader";

export default function OrderDetails({
  orderId,
  razorpayKeyId,
}: {
  orderId: string;
  razorpayKeyId: string;
}) {
  const { trigger: deliverOrder, isMutating: isDelivering } = useSWRMutation(
    `/api/orders/${orderId}`,
    async (url) => {
      const res = await fetch(`/api/admin/orders/${orderId}/deliver`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      res.ok
        ? toast.success("Order delivered successfully")
        : toast.error(data.message);
    }
  );

  const { data: session } = useSession();

  function loadRazorpayScript() {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function handleRazorpayPayment() {
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Failed to load Razorpay SDK.");
      return;
    }

    const order = await fetch(`/api/orders/${orderId}/create-razorpay-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());

    const options = {
      key: razorpayKeyId,
      amount: order.amount,
      currency: "INR",
      name: "Lift Lock",
      description: "Order Payment",
      order_id: order.id,
      handler: function (response: any) {
        fetch(`/api/orders/${orderId}/capture-razorpay-payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }),
        }).then((res) => {
          if (res.ok) {
            toast.success("Order paid successfully");
          } else {
            toast.error("Payment failed");
          }
        });
      },
      prefill: {
        name: session?.user?.name || "",
        email: session?.user?.email || "",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  }

  const { data, error } = useSWR(`/api/orders/${orderId}`);

  if (error) return error.message;
  if (!data) return <Loader />;

  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isDelivered,
    deliveredAt,
    isPaid,
    paidAt,
  } = data;

  return (
    <div className="w-[90%] mx-auto max-w-[1300px]">
      <h1 className="text-2xl font-semibold py-4 mt-5">Order {orderId}</h1>

      <div className="shadow-xl border-t-[4px] border-yellow-400 rounded-xl h-full">
        <div className="card-body">
          <h2 className="card-title ">Ordered Items</h2>
          <table className="table">
            {items.map((item: OrderItem) => (
              <tr key={item.slug} className="flex justify-between items-center">
                <Link
                  href={`/product/${item.slug}`}
                  className="flex items-center my-3"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                  />
                  <div className="px-2">
                    <h1>{item.name}</h1>
                    <h1>
                      ({item.color} {item.size})
                    </h1>
                  </div>
                </Link>
                <td>{item.qty}</td>
                <td>₹{item.price}</td>
              </tr>
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
            {isDelivered ? (
              <div className="text-success">Delivered at {deliveredAt}</div>
            ) : (
              <div className="text-error">Not Delivered</div>
            )}
          </div>
        </div>
        <div className="shadow-xl border-t-[4px] border-yellow-400 rounded-xl h-full">
          <div className="card-body">
            <h2 className="card-title">Payment Method</h2>
            <p>{paymentMethod}</p>
            {isPaid ? (
              <div className="text-success">Paid at {paidAt}</div>
            ) : (
              <div className="text-error">Not Paid</div>
            )}
          </div>
        </div>
      </div>

      <div className="shadow-xl border-t-[4px] border-yellow-400 rounded-xl h-full w-[90%] mx-auto max-w-[500px]">
        <div className="card-body">
          <h2 className="card-title">Order Summary</h2>
          <ul>
            <li>
              <div className="mb-2 flex justify-between">
                <div>Items</div>
                <div>₹{itemsPrice}</div>
              </div>
            </li>
            <li>
              <div className="mb-2 flex justify-between">
                <div>Tax</div>
                <div>₹{taxPrice}</div>
              </div>
            </li>
            <li>
              <div className="mb-2 flex justify-between">
                <div>Shipping</div>
                <div>₹{shippingPrice}</div>
              </div>
            </li>
            <li>
              <div className="mb-2 flex justify-between">
                <div>Total</div>
                <div>₹{totalPrice}</div>
              </div>
            </li>

            {!isPaid && paymentMethod === "Razorpay" && (
              <li>
                <button
                  className="btn btn-primary w-full my-2"
                  onClick={handleRazorpayPayment}
                >
                  Pay with Razorpay
                </button>
              </li>
            )}
            {session?.user.isAdmin && (
              <li>
                <button
                  className="btn w-full my-2"
                  onClick={() => deliverOrder()}
                  disabled={isDelivering}
                >
                  {isDelivering && (
                    <span className="loading loading-spinner"></span>
                  )}
                  Mark as delivered
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
