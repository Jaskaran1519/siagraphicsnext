import React from 'react';
import productService from '../../lib/services/productService';
import { Product } from '@/lib/models/ProductModel';
import ProductCollectionClient from './ProductCollectionClient';

export async function ProductCollection() {
  const categories = await productService.getCategories();
  const latestProducts = await productService.getLatest();

  return <ProductCollectionClient categories={categories} latestProducts={latestProducts} />;
}

export default ProductCollection;