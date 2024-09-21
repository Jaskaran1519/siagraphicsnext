"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/models/ProductModel";
import { formatCategoryName } from "../../lib/utils1";

interface ProductCollectionClientProps {
  categories: string[];
  latestProducts: Product[];
}

const ProductCollectionClient: React.FC<ProductCollectionClientProps> = ({
  categories,
  latestProducts,
}) => {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<
    Record<number, number>
  >({});

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (hoveredIndex !== null) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndices) => {
          const categoryProducts = latestProducts.filter(
            (p) => p.category === categories[hoveredIndex]
          );
          return {
            ...prevIndices,
            [hoveredIndex]:
              ((prevIndices[hoveredIndex] || 0) + 1) %
              (categoryProducts.length || 1),
          };
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [hoveredIndex, categories, latestProducts]);

  const getDefaultVariant = (images: string[] | string): string => {
    const firstImage = Array.isArray(images) ? images[0] : images;
    return firstImage?.split("/").pop()?.split(".")[0] || "";
  };

  return (
    <div className="container mx-auto px-4 md:w-[90%] md:max-w-[1500px]">
      <h2 className="text-2xl md:text-4xl xl:text-6xl font-semibold mt-8 text-center ">
        Our Collection
      </h2>
      <p className="text-center text-md mt-2 mb-8">
        Explore Our Whole Collection Of Printables
      </p>
      <div className="w-full overflow-x-auto sm:ml-0 md:max-w-[2100px] gap-10 flex h-auto md:overflow-hidden md:grid items-center md:grid-cols-2 lg:grid-cols-3 md:justify-center">
        {categories.map((category, index) => {
          const categoryProducts = latestProducts.filter(
            (p) => p.category === category
          );
          const currentProduct =
            categoryProducts[currentImageIndex[index] || 0];
          const currentImage = Array.isArray(currentProduct?.image)
            ? currentProduct?.image[0]
            : currentProduct?.image;

          return (
            <div
              key={category}
              onClick={() => {
                const defaultVariant = getDefaultVariant(
                  currentProduct?.image || ""
                );
                router.push(
                  `/collection/${category}?variant=${defaultVariant}`
                );
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setCurrentImageIndex((prevIndices) => ({
                  ...prevIndices,
                  [index]: 0,
                }));
              }}
              className="w-60 h-56 md:w-full border-[3px] bg-gray-300 border-white outline-[2px] outline-gray-300 relative md:h-72 rounded-3xl flex-shrink-0 md:flex-shrink overflow-hidden cursor-pointer"
              style={{
                backgroundImage: `url(${currentImage || ""})`,
                backgroundSize: "70%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                transition: "background-image 0.5s ease-in-out",
              }}
            >
              <div
                className={`absolute bottom-0 left-0 w-full p-2 bg-opacity-30 ${
                  hoveredIndex === index ? "bg-gray-800" : "bg-gray-500"
                } transition-colors duration-500`}
              >
                <h3
                  className={`text-lg text-center font-semibold ${
                    hoveredIndex === index ? "text-white" : "text-white"
                  }`}
                >
                  {formatCategoryName(category)}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCollectionClient;
