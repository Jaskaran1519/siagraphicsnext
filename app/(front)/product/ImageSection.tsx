"use client";
import Image from "next/image";
import React, { useState } from "react";

const ImageSection = ({ product }: { product: any }) => {
  const [mainImage, setMainImage] = useState(product?.image[0]);

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-4 md:sticky top-10 h-auto max-h-[calc(100vh-40px)]">
      <div className="flex-1">
        <Image
          src={mainImage}
          alt={product.name}
          width={1000}
          height={1000}
          className="aspect-square rounded-lg "
        />
      </div>
      <div className="grid grid-cols-4 lg:flex lg:flex-col gap-4">
        {product.image.map((img: string, index: any) => (
          <Image
            width={100}
            height={100}
            key={index}
            src={img}
            className={`cursor-pointer object-cover border rounded-lg ${
              mainImage === img ? "border-black" : ""
            }`}
            alt={`Product image ${index + 1}`}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSection;
