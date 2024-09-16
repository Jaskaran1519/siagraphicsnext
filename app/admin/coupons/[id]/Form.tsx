"use client";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import toast from "react-hot-toast";
import Link from "next/link";
import { ValidationRule, useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import { formatId } from "@/lib/utils1";
import { useRouter } from "next/navigation";
import { Coupon } from "@/lib/models/CouponModel";

export default function ProductEditForm({ couponId }: { couponId: string }) {
  const { data: coupon, error } = useSWR(`/api/admin/coupons/${couponId}`);
  const router = useRouter();
  const { trigger: updateCoupon, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/coupons/${couponId}`,
    async (url, { arg }) => {
      const res = await fetch(`${url}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success("Coupon updated successfully");
      router.push("/admin/coupons");
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Coupon>();

  useEffect(() => {
    if (!coupon) return;
    setValue("code", coupon.code);
    setValue("discountType", coupon.discountType);
    setValue("discountValue", coupon.discountValue);
    setValue("expiryDate", coupon.expiryDate);
    setValue("usageLimit", coupon.usageLimit);
    setValue("usedCount", coupon.brusedCountand);
    setValue("isActive", coupon.coisActiveuntInStock);
  }, [coupon, setValue]);

  const formSubmit = async (formData: any) => {
    await updateCoupon(formData);
  };

  if (error) return error.message;
  if (!coupon) return "Loading...";

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof Coupon;
    name: string;
    required?: boolean;
    pattern?: ValidationRule<RegExp>;
  }) => (
    <div className="md:flex mb-6">
      <label className="label md:w-1/5" htmlFor={id}>
        {name}
      </label>
      <div className="md:w-4/5">
        <input
          type="text"
          id={id}
          {...register(id, {
            required: required && `${name} is required`,
            pattern,
          })}
          className="input input-bordered w-full max-w-md"
        />
        {errors[id]?.message && (
          <div className="text-error">{errors[id]?.message}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-[90%] mx-auto">
      <h1 className="text-2xl py-4">Edit Product {formatId(couponId)}</h1>
      <div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <FormInput name="Code" id="code" required />
          <div className="md:flex gap-10 my-5 items-center">
            Discount Type
            <div className="md:w-3/5">
              <select
                id="discountType"
                className="select select-bordered w-full"
                {...register("discountType")}
              >
                <option value="">Select Discount Type</option>
                <option value="percentage">Percentage</option>
                <option value="amount">Amount</option>
              </select>
            </div>
          </div>
          <FormInput name="Discount Value" id="discountValue" required />
          <FormInput name="Usage Limit" id="usageLimit" required />

          <div className="md:flex my-3">
            <label className="label md:w-1/5" htmlFor="isAdmin">
              Is it Active?
            </label>
            <div className="md:w-4/5">
              <input
                id="isAdmin"
                type="checkbox"
                className="toggle"
                {...register("isActive")}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="btn btn-primary"
          >
            {isUpdating && <span className="loading loading-spinner"></span>}
            Update
          </button>
          <Link className="btn ml-4 " href="/admin/coupons">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}
