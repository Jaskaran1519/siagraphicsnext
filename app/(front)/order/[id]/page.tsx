import OrderDetails from "./OrderDetails";

export function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Order ${params.id}`,
  };
}

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <OrderDetails
      razorpayKeyId={process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "sb"}
      orderId={params.id}
    />
  );
}
