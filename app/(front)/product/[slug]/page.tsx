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
    <div className="w-[90%] mx-auto h-auto">
      <div className="my-5">
        <Link href="/">
          <button className="flex gap-2 hover:text-zinc-600">
            <ArrowLeft />
            Back to Products
          </button>
        </Link>
      </div>
      {/* Adjust the grid layout for responsiveness */}
      <div className=" grid gap-5 md:grid-cols-2  md:gap-6">
        {/* Product Image */}
        <div className="">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Product Information */}
        <div className="space-y-4">
          <ul>
            <li>
              <h1 className="text-2xl font-semibold">{product.name}</h1>
            </li>
            <li>
              <Rating
                value={product.rating}
                caption={`${product.numReviews} ratings`}
              />
            </li>
            <li className="text-gray-700">Brand: {product.brand}</li>
            <li>
              <div className="divider"></div>
            </li>
            <li>
              <p className="text-gray-600">Description:</p>
              <p>{product.description}</p>
            </li>
          </ul>
          <div className="mt-6 lg:mt-0">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="mb-4 flex justify-between text-lg">
                  <div>Price</div>
                  <div className="font-semibold">${product.price}</div>
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

        {/* Product Card */}
      </div>
    </div>
  );
}
