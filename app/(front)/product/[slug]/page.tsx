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
    <div className="w-[90%] max-w-[1200px] mx-auto h-auto">
      <div className="my-5">
        <Link href="/">
          <button className="flex gap-2 hover:text-zinc-600">
            <ArrowLeft />
            Back to Products
          </button>
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        <div>
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
          <p className="text-gray-400 mt-4">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
