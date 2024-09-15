"use client";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import toast from "react-hot-toast";
import Link from "next/link";
import { ValidationRule, useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import { Product } from "@/lib/models/ProductModel";
import { formatId } from "@/lib/utils1";
import { useRouter } from "next/navigation";

export default function ProductEditForm({ productId }: { productId: string }) {
  const { data: product, error } = useSWR(`/api/admin/products/${productId}`);
  const router = useRouter();
  const { trigger: updateProduct, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/products/${productId}`,
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

      toast.success("Product updated successfully");
      router.push("/admin/products");
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Product>();

  // Field array for sizes
  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray<any>({
    control,
    name: "sizes",
  });

  // Field array for multiple images
  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray<any>({
    control,
    name: "image",
  });

  useEffect(() => {
    if (!product) return;
    setValue("name", product.name);
    setValue("slug", product.slug);
    setValue("price", product.price);
    setValue("image", product.image || []); // Handling multiple images
    setValue("category", product.category);
    setValue("brand", product.brand);
    setValue("countInStock", product.countInStock);
    setValue("description", product.description);
    setValue("sizes", product.sizes || []);
  }, [product, setValue]);

  const formSubmit = async (formData: any) => {
    await updateProduct(formData);
  };

  if (error) return error.message;
  if (!product) return "Loading...";

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof Product;
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

  const uploadHandler = async (e: any, index: number) => {
    const toastId = toast.loading(`Uploading image ${index + 1}...`);
    try {
      const resSign = await fetch("/api/cloudinary-sign", {
        method: "POST",
      });
      const { signature, timestamp } = await resSign.json();
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setValue(`image.${index}`, data.secure_url); // Save image URL in the correct field
      toast.success(`Image ${index + 1} uploaded successfully`, {
        id: toastId,
      });
    } catch (err: any) {
      toast.error(err.message, {
        id: toastId,
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl py-4">Edit Product {formatId(productId)}</h1>
      <div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <FormInput name="Name" id="name" required />
          <FormInput name="Slug" id="slug" required />
          <FormInput name="Price" id="price" required />
          <FormInput name="Category" id="category" required />
          <FormInput name="Brand" id="brand" required />
          <FormInput name="Description" id="description" required />
          <FormInput name="Count In Stock" id="countInStock" required />

          {/* Image Uploads */}
          <div className="md:flex mb-6">
            <label className="label md:w-1/5" htmlFor="imageFile">
              Upload Images
            </label>
            <div className="md:w-4/5">
              {imageFields.map((field, index) => (
                <div key={field.id} className="flex items-center mb-2">
                  <input
                    type="file"
                    className="file-input w-full max-w-md"
                    id={`imageFile_${index}`}
                    onChange={(e) => uploadHandler(e, index)}
                  />
                  <button
                    type="button"
                    className="ml-2 btn btn-error"
                    onClick={() => removeImage(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={() => appendImage("")}
              >
                Add Image
              </button>
            </div>
          </div>

          {/* Sizes Input */}
          <div className="md:flex mb-6">
            <label className="label md:w-1/5" htmlFor="sizes">
              Sizes
            </label>
            <div className="md:w-4/5">
              {sizeFields.map((field, index) => (
                <div key={field.id} className="flex items-center mb-2">
                  <input
                    type="text"
                    {...register(`sizes.${index}`, {
                      required: "Size is required",
                    })}
                    className="input input-bordered w-full max-w-md"
                  />
                  <button
                    type="button"
                    className="ml-2 btn btn-error"
                    onClick={() => removeSize(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={() => appendSize("")}
              >
                Add Size
              </button>
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
          <Link className="btn ml-4 " href="/admin/products">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}
