"use client"
import React, { useState, useEffect, useRef } from "react";
import { Carousel } from "primereact/carousel";
import Image from "next/image";
import { Archivo } from "next/font/google";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300"],
});

interface Product {
  slug: string;
  name: string;
  image: string[];
  price: number;
  color?: string[];
  category: string;
}

interface IntroCarouselProps {
  products: Product[];
  categories: string[];
}

export default function IntroCarousel({
  products,
  categories,
}: IntroCarouselProps) {
  const [autoplayInterval, setAutoplayInterval] = useState<number | undefined>(
    3000
  );
  const carouselRef = useRef<Carousel>(null);

  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const productTemplate = (product: Product) => {
    return (
      <div className="border-1 relative surface-border w-full h-full bg-[#FAF9F9] border-round text-center py-5 px-3">
        <div className="mb-3">
          <Image
            width={500}
            height={500}
            src={product.image[0]}
            alt={product.name}
            className="h-72 w-auto shadow-2 mx-auto my-10"
          />
        </div>
        <div className={`${archivo.className} mt-10`}>
          <h4 className="mb-1 text-2xl font-semibold">{product.name}</h4>
          <div className="mt-2 flex justify-center gap-5">
            <h6 className="mt-0 text-xl items-center">
              ₹{product.price} / item
            </h6>
            <div className="flex gap-2 items-center">
              {product.color &&
                product.color.map((color: string, index: number) => (
                  <div
                    key={index}
                    className={`w-6 h-6 rounded-full border-[3px] border-white ${color}`}
                  ></div>
                ))}
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-5 my-5">
            <button className="flex gap-2 mt-3 px-5 py-2 border-[1px] border-black bg-white text-zinc-900 hover:text-white hover:bg-zinc-900 duration-300 rounded-full">
              ADD TO CART
              <span>
                <ChevronDown />
              </span>
            </button>
            <Link
              href={`/collection/${product.category}?variant=${product.slug}`}
            >
              <button className="mt-3 px-5 py-2 text-md font-extralight bg-zinc-900 text-white hover:bg-white hover:text-zinc-900 duration-300 rounded-full">
                CHECKOUT
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const handleMouseEnter = () => {
    setAutoplayInterval(undefined);
  };

  const handleMouseLeave = () => {
    setAutoplayInterval(3000);
  };

  useEffect(() => {
    if (carouselRef.current) {
      if (autoplayInterval) {
        carouselRef.current.startAutoplay();
      } else {
        carouselRef.current.stopAutoplay();
      }
    }
  }, [autoplayInterval]);

  return (
    <div
      className="card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Carousel
        ref={carouselRef}
        value={products}
        numVisible={1}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        className="custom-carousel"
        circular
        autoplayInterval={autoplayInterval}
        itemTemplate={productTemplate}
      />
    </div>
  );
}
