import productService from "@/lib/services/productService";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Rating } from "@/components/products/Rating";
import ClientSideProductDetails from "../SizeSelector";

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const product = await productService.getBySlug(params.slug);
  if (!product) {
    return (
      <div className="w-full h-full justify-center items-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="w-[90%] max-w-[1200px] mb-16 mx-auto h-auto ">
      <div className="my-5">
        <Link href="/">
          <button className="flex gap-2 hover:text-zinc-600">
            <ArrowLeft />
            Back to Products
          </button>
        </Link>
      </div>
      <div className="grid  md:grid-cols-2 gap-6 relative">
        <div className=" md:sticky top-10 h-auto max-h-[calc(100vh-40px)]">
          <Image
            src={product.image}
            alt={product.name}
            width={1000}
            height={1000}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        <div className="mt-5 md:mt-0">
          <h1 className="">{product.brand}</h1>
          <h1 className="text-4xl font-bold mb-3">
            {product.name.toUpperCase()}
          </h1>
          <Rating
            value={product.rating}
            caption={`${product.numReviews} ratings`}
          />

          <ClientSideProductDetails product={product} />
          <p className="text-gray-700 text-lg font-semibold mt-6">
            {product.description}
          </p>
          <ul className="list-disc mt-5 px-5 leading-relaxed text-lg">
            <li>High-quality Leather and clip</li>
            <li>Full-grain sole leather</li>
            <li>Stainless steel buckle</li>
            <li>Fully customisable</li>
          </ul>
          <p className="text-red-700 text-lg font-semibold mt-2">
            How to measure: Using a measuring tape held snug, measure around
            where the belt will be worn Measure with your clothing on around the
            area the belt will be worn (not pants waist size)
          </p>
          <p className="text-zinc-900 mt-3">
            The warranty only covers problems that affect the buckle's
            functionality. The warranty is valid only for the original customer
            who bought the product and cannot be transferred to someone else.
            Cosmetic issues are not covered by the warranty. If you need a
            replacement, we'll provide one, but that's it. If you have more
            problems after that, the warranty is no longer valid.
          </p>
        </div>
      </div>
    </div>
  );
}
