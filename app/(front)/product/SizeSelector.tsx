"use client";
import { useState, useEffect } from "react";
import AddToCart from "@/components/products/AddToCart";
import { convertDocToObj } from "@/lib/utils1";

export default function ClientSideProductDetails({
  product,
}: {
  product: any;
}) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [defaultSize, setDefaultSize] = useState<string>("");

  useEffect(() => {
    if (!product.sizes || product.sizes.length === 0) {
      return; // Handle scenario where no sizes are available
    }
    setDefaultSize(product.sizes[0]); // Set first size as default
  }, [product.sizes]); // Run effect only when product.sizes changes

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <div className="mt-6 lg:mt-0">
      <div className="mb-4 flex justify-between font-semibold text-lg">
        <div>Price</div>
        <div className="font-semibold">₹{product.price}</div>
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
              px-3 py-1 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
              ${selectedSize === size ? "bg-primary text-white" : ""}
            `}
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {product.countInStock !== 0 && (
        <div className="card-actions justify-center">
          <AddToCart
            item={{
              ...convertDocToObj(product),
              qty: 0,
              color: "",
              size: selectedSize || defaultSize,
            }}
          />
        </div>
      )}
    </div>
  );
}
