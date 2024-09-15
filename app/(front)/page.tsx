/* eslint-disable @next/next/no-img-element */
import ProductItem from "@/components/products/ProductItem";
import productService from "@/lib/services/productService";
import { convertDocToObj } from "@/lib/utils1";
import { Metadata } from "next";
import CarouselBanner from "../../components/CarouselBanner";
import Review from "../../components/Reviews";
import Faq from "@/components/Faq";
import { Maven_Pro } from "next/font/google";
import Reels from "@/components/heropage/Reels";
import Image from "next/image";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "Lift Lock",
  description: process.env.NEXT_PUBLIC_APP_DESC || "Premium gym safety gear",
  icons: {
    icon: "/whitelogo.png",
  },
};

const headingFont = Maven_Pro({
  subsets: ["latin"],
  weight: ["500"],
});

export default async function Home() {
  const featuredProducts = await productService.getFeatured();
  const latestProducts = await productService.getLatest();

  return (
    <div className="w-full max-w-[1700px] bg-background">
      <CarouselBanner />
      <div className="w-[90%] mx-auto h-auto mt-5 px-4">
        <Reels />
        <h2
          className={` ${headingFont.className} text-3xl md:text-4xl lg:text-5xl  font-semibold my-5 py-5`}
        >
          Latest Products
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {latestProducts.map((product) => (
            <ProductItem
              key={product.slug}
              product={convertDocToObj(product)}
            />
          ))}
        </div>
      </div>
      <Image
        src="/photos/photo3.png"
        width={1000}
        height={1000}
        className="w-full auto mt-10"
        alt=""
      />
      <div className="w-[90%] mx-auto h-auto ">
        <Faq />
      </div>
      <Image
        src="/photos/photo4.jpg"
        width={1000}
        height={1000}
        className="w-full h-auto"
        alt=""
      />
      <Review />
      <div className="mt-10 w-full h-[300px] flex flex-col gap-8 justify-center items-center">
        <p className="text-3xl md:text-5xl text-center font-semibold">
          Have something else on your mind?? Let us know
        </p>
        <button className="px-5 py-2 bg-zinc-900 hover:bg-black  text-white rounded-xl text-xl">
          Contact Us
        </button>
      </div>
    </div>
  );
}
