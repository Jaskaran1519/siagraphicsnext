import productService from "@/lib/services/productService";
import IntroCarousel from "./IntroCarousel";
import { convertDocToObj } from "@/lib/utils1";

export default async function Pagecontent() {
  const products = await productService.getFeatured();
  const categories = await productService.getCategories();

  const convertedProducts = products.map(product => {
    const convertedProduct = convertDocToObj(product);
    return {
      ...convertedProduct,
      category: convertedProduct.category // Ensure category is included
    };
  });

  return (
    <div className="w-[90%] mx-auto min-h-[30vh] h-auto my-10 md:flex justify-center items-center rounded-xl bg-[#FAF9F9]">
      <div className="w-full md:w-[60%] md:pl-5">
        <h1 className="text-[2rem] font-semibold md:text-[3rem] xl:text-[5rem] pt-5 md:leading-tight">
          Discover premium prints without limitation
        </h1>
        <button className="mt-3 lg:mt-10 mb-10 border-[1px] border-black px-3 py-2 rounded-full hover:bg-zinc-900 hover:text-white duration-300">
          Check our collection
        </button>
      </div>
      <div className="w-full md:w-[40%]">
        <IntroCarousel products={convertedProducts} categories={categories} />
      </div>
    </div>
  );
}