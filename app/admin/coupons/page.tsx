import AdminLayout from "@/components/admin/AdminLayout";
import Coupons from "./Coupons";

export const metadata = {
  title: "Admin Coupons",
};
const AdminOrdersPage = () => {
  return (
    <AdminLayout activeItem="coupons">
      <Coupons />
    </AdminLayout>
  );
};

export default AdminOrdersPage;
