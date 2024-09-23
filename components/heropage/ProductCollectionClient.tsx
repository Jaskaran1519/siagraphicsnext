"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  const [categoryImages, setCategoryImages] = useState<
    Record<string, string[]>
  >({});
  const [currentImageIndexes, setCurrentImageIndexes] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    const images: Record<string, string[]> = {};
    categories.forEach((category) => {
      const categoryProducts = latestProducts.filter(
        (p) => p.category === category
      );
      images[category] = categoryProducts
        .flatMap((p) => (Array.isArray(p.image) ? p.image : [p.image]))
        .filter(Boolean);
      if (images[category].length === 0) {
        images[category] = [""]; 
      }
    });
    setCategoryImages(images);

    const initialIndexes: Record<string, number> = {};
    categories.forEach((category) => {
      initialIndexes[category] = 0;
    });
    setCurrentImageIndexes(initialIndexes);
  }, [categories, latestProducts]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndexes((prevIndexes) => {
        const newIndexes = { ...prevIndexes };
        categories.forEach((category) => {
          const images = categoryImages[category] || [];
          newIndexes[category] = (prevIndexes[category] + 1) % images.length;
        });
        return newIndexes;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [categories, categoryImages]);

  return (
    <div className="container mx-auto px-4 md:w-[90%] md:max-w-[1500px]">
      <h2 className="text-2xl md:text-4xl xl:text-6xl font-semibold mt-8 text-center">
        Our Collection
      </h2>
      <p className="text-center text-md mt-2 mb-8">
        Explore Our Whole Collection Of Printables
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link href={`/collection/${category}`} key={category}>
            <div
              className="w-full h-72 border-[3px] bg-gray-300 border-white outline-[2px] outline-gray-300 relative rounded-3xl overflow-hidden cursor-pointer"
              style={{
                backgroundImage: `url(${
                  categoryImages[category]?.[currentImageIndexes[category]] ||
                  ""
                })`,
                backgroundSize: "70%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                transition: "background-image 0.5s ease-in-out",
              }}
            >
              <div className="absolute bottom-0 left-0 w-full p-2 bg-gray-500 bg-opacity-30">
                <h3 className="text-lg text-center font-semibold text-white">
                  {formatCategoryName(category)}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductCollectionClient;
