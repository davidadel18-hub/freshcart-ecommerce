import { getAllProducts } from '@/lib/api/AllProducts/getAllProducts'
import React, { Suspense } from 'react'
import ProductCardSkeleton from '../_comp/productCardSkeleton/ProductCardSkeleton';
import ProductCard from '../_comp/productCard/ProductCard';

export default async function MenFashion() {
  const allProduct = await getAllProducts()
  console.log(allProduct);

  return (
    <>
      <div className='container mx-auto'>

        <h3 className="border-l-4 mb-4 border-[#008159] pl-4 py-1.5 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800">
          Men's <span className="text-[#009966]">Fashion</span>
        </h3>


        <Suspense
          fallback={<> <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 justify-items-center">
            {/* تكرار سكيلتون المنتج 8 مرات */}
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div></>}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 justify-items-center">
            {allProduct.filter(
                (product) =>
                  product.category?.name?.toLowerCase() === "men's fashion"
              )
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

        </Suspense>

      </div>
    </>
  )
}
