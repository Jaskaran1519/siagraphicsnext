"use client";

import { Product } from "@/lib/models/ProductModel";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function ProductItem({ product }: { product: Product }) {
  return (
    <Card className="w-full max-w-sm overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative">
          <Image
            src={product.image[0]}
            alt={product.name}
            className="w-full  object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            height="400"
            width="400"
            style={{
              aspectRatio: "400/400",
              objectFit: "cover",
            }}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Link href={`/collection/${product.category}?variant=${product.slug}`}>
          <h3 className="text-2xl font-semibold mb-2">
            {product.name.toUpperCase()}
          </h3>
        </Link>
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-3 text-lg font-bold">
            ₹{product.price} <h1 className="line-through">₹5500</h1>{" "}
          </div>
          <div className="flex items-center">
            {/* {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < product.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))} */}
            <div className="flex gap-1 font-semibold text-lg items-center">
              5 <Star className="w-5 h-5 text-yellow-600 fill-yellow-500" />
            </div>
            <span className="ml-2 text-sm text-gray-600">
              ({product.numReviews} reviews)
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">{product.brand}</p>
      </CardContent>
      <Link href={`/collection/${product.category}?variant=${product.slug}`}>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
