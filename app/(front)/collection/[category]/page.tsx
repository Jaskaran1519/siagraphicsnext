import { Suspense } from "react";
import productService from "@/lib/services/productService";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Rating } from "@/components/products/Rating";
import ClientSideProductDetails from "../../product/SizeSelector";
import ImageSection from "../../product/ImageSection";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { variant?: string; page?: string };
}) {
  const { products } = await productService.getByQuery({
    q: "all",
    category: params.category,
    price: "all",
    rating: "all",
    sort: "featured",
    page: "1",
  });

  const selectedProduct = searchParams.variant
    ? await productService.getBySlug(searchParams.variant)
    : products[0];

  if (!products || products.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        No products found in this category
      </div>
    );
  }

  return (
    <div className="w-[90%] max-w-[1200px] mb-16 mx-auto h-auto">
      <div className="my-5">
        <Link href="/">
          <button className="flex gap-2 hover:text-zinc-600">
            <ArrowLeft />
            Back to Categories
          </button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">
        {params.category.toUpperCase()} COLLECTION
      </h1>

      {selectedProduct && (
        <div className="grid md:grid-cols-2 gap-6 relative">
          <Suspense fallback={<div>Loading...</div>}>
            <ImageSection product={selectedProduct} />
          </Suspense>

          <div className="mt-5 md:mt-0">
            <h1 className="">{selectedProduct.brand}</h1>
            <h1 className="text-4xl font-bold mb-3">
              {selectedProduct.name.toUpperCase()}
            </h1>
            <Rating
              value={selectedProduct.rating}
              caption={`${selectedProduct.numReviews} ratings`}
            />

            <Suspense fallback={<div>Loading...</div>}>
              <ClientSideProductDetails product={selectedProduct} />
            </Suspense>

            <div className="mt-8">
              <div className="grid grid-cols-4 gap-4">
                {products
                  .filter((p) => p.slug !== selectedProduct.slug)
                  .slice(0, 4)
                  .map((product) => (
                    <Link
                      key={product.slug}
                      href={`/collection/${params.category}?variant=${product.slug}`}
                    >
                      <div className="cursor-pointer">
                        <Image
                          src={product.image[0]}
                          alt={product.name}
                          width={100}
                          height={100}
                          className="w-full h-24 object-cover mb-2"
                        />
                        <p className="text-sm font-medium truncate">
                          {product.name}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            <p className="text-gray-700 text-lg font-semibold mt-6">
              {selectedProduct.description}
            </p>

            {/* Product features */}
            <ul className="list-disc mt-5 px-5 leading-relaxed text-lg">
              <li>High-quality Leather and clip</li>
              <li>Full-grain sole leather</li>
              <li>Stainless steel buckle</li>
              <li>Fully customisable</li>
            </ul>

            <p className="text-red-700 text-lg font-semibold mt-2">
              How to measure: Using a measuring tape held snug, measure around
              where the belt will be worn Measure with your clothing on around
              the area the belt will be worn (not pants waist size)
            </p>

            <p className="text-zinc-900 mt-3">
              The warranty only covers problems that affect the buckle's
              functionality. The warranty is valid only for the original
              customer who bought the product and cannot be transferred to
              someone else. Cosmetic issues are not covered by the warranty. If
              you need a replacement, we'll provide one, but that's it. If you
              have more problems after that, the warranty is no longer valid.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
