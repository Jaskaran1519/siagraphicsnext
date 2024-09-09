"use client";

import { useState, useEffect } from "react";
import AddToCart from "@/components/products/AddToCart";
import { toast } from "react-hot-toast"; // For toast notifications

interface Product {
  name: string;
  slug: string;
  image: string;
  sizes: string[];
  price: number;
}

export default function AddToCartClient({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined
  );
  const [quantity, setQuantity] = useState(1); // Quantity state

  // Set the first size as default after component mount
  useEffect(() => {
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product.sizes]);

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      return toast.error("Please select a size");
    }

    // Handle adding the item to the cart
    AddToCart({
      item: {
        name: product.name,
        slug: product.slug,
        image: product.image,
        qty: quantity,
        size: selectedSize,
        price: product.price,
        color:''
      },
    });

    toast.success(`${product.name} added to cart`);
    resetSelection();
  };

  // Reset selection to allow adding the item again
  const resetSelection = () => {
    setSelectedSize(product.sizes[0]);
    setQuantity(1);
  };

  return (
    <div>
      <div className="mt-5 flex gap-2 flex-wrap">
        {product.sizes?.map((item, index) => (
          <div
            key={index}
            className={`border-[1px] border-gray-400 px-5 py-1 rounded-xl hover:bg-base-300 cursor-pointer ${
              selectedSize === item ? "bg-base-300" : ""
            }`}
            onClick={() => handleSizeSelection(item)}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Quantity Selection */}
      <div className="mt-4 flex gap-2 items-center">
        <button
          className="btn btn-secondary"
          onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className="btn btn-secondary"
          onClick={() => setQuantity((prev) => prev + 1)}
        >
          +
        </button>
      </div>

      <div className="mt-6 lg:mt-4">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="mb-4 flex justify-between text-lg">
              <div>Price</div>
              <div className="font-semibold">₹{product.price}</div>
            </div>

            <div className="card-actions justify-center">
              <button
                className="btn btn-primary w-full"
                type="button"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
