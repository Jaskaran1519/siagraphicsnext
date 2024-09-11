import AdminLayout from "@/components/admin/AdminLayout";
import Form from "./Form";

export function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Edit Coupon ${params.id}`,
  };
}

export default function ProductEditPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <AdminLayout activeItem="coupons">
      <Form couponId={params.id} />
    </AdminLayout>
  );
}
