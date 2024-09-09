import AddToCart from "@/components/products/AddToCart";
import { convertDocToObj } from "@/lib/utils1";
import productService from "@/lib/services/productService";
import Image from "next/image";
import Link from "next/link";
import { Rating } from "@/components/products/Rating";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = await productService.getBySlug(params.slug);
  if (!product) {
    return { title: "Product not found" };
  }
  return {
    title: product.name,
    description: product.description,
  };
}

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
      <div className=" grid gap-5 md:grid-cols-2  md:gap-6">
        <div className="">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        <div className="">
          <h1>LIFT LOCK</h1>
          <ul className="space-y-4">
            <li>
              <h1 className="text-4xl font-bold">
                {product.name.toUpperCase()}
              </h1>
            </li>
            <li>
              <Rating
                value={product.rating}
                caption={`${product.numReviews} ratings`}
              />
            </li>
            <li className="text-gray-400">Brand: {product.brand}</li>
            <li>
              <div className="divider"></div>
            </li>
            <li>
              <p className="text-gray-200">Description:</p>
              <p className="text-gray-400">{product.description}</p>
            </li>
          </ul>
          <div className="mt-6 lg:mt-0">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="mb-4 flex justify-between text-lg">
                  <div>Price</div>
                  <div className="font-semibold">₹{product.price}</div>
                </div>
                <div className="mb-4 flex justify-between text-lg">
                  <div>Status</div>
                  <div
                    className={`${
                      product.countInStock > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {product.countInStock > 0 ? "In stock" : "Unavailable"}
                  </div>
                </div>
                {product.countInStock !== 0 && (
                  <div className="card-actions justify-center">
                    <AddToCart
                      item={{
                        ...convertDocToObj(product),
                        qty: 0,
                        color: "",
                        size: "",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
