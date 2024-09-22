import React from "react";
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
  const getCategoryImage = (category: string): string => {
    const categoryProduct = latestProducts.find((p) => p.category === category);
    if (!categoryProduct || !categoryProduct.image) {
      return ""; // Return empty string if no product or image found
    }
    if (Array.isArray(categoryProduct.image)) {
      return categoryProduct.image[0] || "";
    }
    return categoryProduct.image;
  };

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
                backgroundImage: `url(${getCategoryImage(category)})`,
                backgroundSize: "70%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
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
