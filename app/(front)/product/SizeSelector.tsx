"use client";
import { useState, useEffect } from "react";
import AddToCart from "@/components/products/AddToCart";
import { convertDocToObj } from "@/lib/utils1";
import toast from "react-hot-toast";

export default function ClientSideProductDetails({
  product,
}: {
  product: any;
}) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [defaultSize, setDefaultSize] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>(""); // To store the Cloudinary image URL
  const [isUploading, setIsUploading] = useState<boolean>(false); // Track image upload status

  useEffect(() => {
    console.log(product);
    if (!product.sizes || product.sizes.length === 0) {
      return;
    }
    setDefaultSize(product.sizes[0]);
  }, [product.sizes]);

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  const uploadHandler = async (e: any) => {
    const toastId = toast.loading("Uploading image...");
    setIsUploading(true);
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
      setImageUrl(data.secure_url);
      toast.success("Image uploaded successfully!", {
        id: toastId,
      });
    } catch (err: any) {
      toast.error("Image upload failed!", {
        id: toastId,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mt-6">
      <div className="mb-4 flex justify-between font-semibold text-lg">
        <div>Price</div>
        <div className="flex gap-3">
          <div className="font-semibold">₹{product.price}</div>
          <div className="font-semibold line-through">₹5500</div>
        </div>
      </div>
      <div className="mb-4 flex justify-between font-semibold text-lg">
        <div>Status</div>
        <div
          className={`${
            product.countInStock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.countInStock > 0 ? "In stock" : "Unavailable"}
        </div>
      </div>

      <div className="mb-8">
        <label htmlFor="size" className="font-semibold text-lg">
          Select Size:
        </label>
        <div className="flex flex-wrap gap-3 mt-3">
          {product.sizes.map((size: string) => (
            <button
              key={size}
              type="button"
              className={`
                px-3 py-1 rounded-xl border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                ${selectedSize === size ? "bg-zinc-700 text-white" : ""}
              `}
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* File Upload for Custom Image */}
      <div className="mb-8">
        <label htmlFor="imageUpload" className="font-semibold text-lg block">
          Upload Your Custom Design:
        </label>
        <div className="mt-3 flex flex-col items-center gap-4">
          {imageUrl ? (
            <div className="mt-4 flex flex-col items-center">
              <p className="text-sm text-gray-500">Uploaded image:</p>
              <img
                src={imageUrl}
                alt="Uploaded Design"
                className="max-w-xs rounded-md shadow-lg"
              />
            </div>
          ) : (
            <label className="cursor-pointer w-48 h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center hover:bg-gray-100 transition">
              <span className="text-gray-500">Choose file</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={uploadHandler}
              />
            </label>
          )}
          <h1>( ₹500 extra fee for customisation )</h1>
        </div>
      </div>

      {product.countInStock !== 0 && (
        <div
          className={`${
            isUploading ? `hidden` : ``
          } card-actions justify-center`}
        >
          <AddToCart
            item={{
              ...convertDocToObj(product),
              qty: 1,
              color: "",
              size: selectedSize || defaultSize,
              design: imageUrl,
            }}
          />
        </div>
      )}
    </div>
  );
}
