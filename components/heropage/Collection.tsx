import React from "react";
import productService from "../../lib/services/productService";
import { Product } from "@/lib/models/ProductModel";
import ProductCollectionClient from "./ProductCollectionClient";

// Modified utility function
export function convertDocToObj(doc: any) {
  if (doc._id && typeof doc._id.toString === "function") {
    doc._id = doc._id.toString();
  }
  return doc;
}

export async function ProductCollection() {
  const categories = await productService.getCategories();
  const latestProducts = await productService.getAllProducts();

  const convertedCategories = categories.map(convertDocToObj);
  const convertedLatestProducts = latestProducts.map(convertDocToObj);

  return (
    <ProductCollectionClient
      categories={convertedCategories}
      latestProducts={convertedLatestProducts}
    />
  );
}

export default ProductCollection;
