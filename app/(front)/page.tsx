/* eslint-disable @next/next/no-img-element */
import ProductItem from "@/components/products/ProductItem";
import productService from "@/lib/services/productService";
import { convertDocToObj } from "@/lib/utils1";
import { Metadata } from "next";
import CarouselBanner from "../../components/CarouselBanner";
import SizeChart from "../../components/SizeChart";
import Review from "../../components/Reviews";
import Faq from "@/components/Faq";
import { Maven_Pro } from "next/font/google";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "Lift Lock",
  description: process.env.NEXT_PUBLIC_APP_DESC || "Premium gym safety gear",
  icons: {
    icon: "/whitelogo.png", // Path to your logo with a white background
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
        <h2
          className={` ${headingFont.className} text-3xl md:text-4xl lg:text-5xl text-center font-semibold py-5`}
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
        <Faq />
      </div>
      <Review />
    </div>
  );
}
