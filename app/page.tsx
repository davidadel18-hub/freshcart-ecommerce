
import { getAllCategory, getAllProducts } from "@/lib/api/AllProducts/getAllProducts";
import Image from "next/image";
// import ProductCard from "./_comp/productCard/ProductCard";
import SwiperComponent from "./_comp/swiper/Swiper";
import img1 from '../assets/images/slider-image-1.jpeg'
import img2 from '../assets/images/slider-image-2.jpeg'
import img3 from '../assets/images/slider-image-3.jpeg'
import FourSmallCards from "./_comp/fourSmallCards/FourSmallCards";
import { lazy, Suspense } from "react";
import CategoryCardSkeleton from "./_comp/CategoryCardSkeleton/CategoryCardSkeleton";
import ProductCardSkeleton from "./_comp/productCardSkeleton/ProductCardSkeleton";
// import CategoryCard from "./_comp/categoryCard/CategoryCard";

const CategoryCard = lazy(() => import('./_comp/categoryCard/CategoryCard'));
const ProductCard = lazy(() => import('./_comp/productCard/ProductCard'));
export default async function Home() {

  const allProudcts = await getAllProducts()
  //console.log(allProudcts);

  const allCategories = await getAllCategory()
  // console.log(allCategories);

  return (
    <>

      <div className="container mx-auto">

        {/* Slider */}
        <SwiperComponent spaceBetween={1} slidesPerView={1} src={[img1.src, img2.src, img3.src]} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 mb-8">
          <FourSmallCards comp="Free Shipping" mainText="On orders over 500 EGP" />
          <FourSmallCards comp="Secure Payment" mainText="100% secure payment processing" />
          <FourSmallCards comp="24/7 Support" mainText="Dedicated customer support" />
          <FourSmallCards comp="Money Back" mainText="30-day money-back guarantee" />
        </div>

        {/* Shop By Category */}
        <h3 className="border-l-4 mb-4 border-[#008159] pl-4 py-1.5 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800">
          Shop By <span className="text-[#009966]">Category</span>
        </h3>
        <Suspense fallback={<>  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4 justify-items-center">
          {/* تكرار الهيكل 6 مرات كمثال */}
          {Array.from({ length: 6 }).map((_, index) => (
            <CategoryCardSkeleton key={index} />
          ))}
        </div></>}>
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 justify-items-center">
            {allCategories.map((category) => { return <CategoryCard key={category._id} category={category} /> })}
          </div>

        </Suspense>






        <h3 className="border-l-4 mb-4 border-[#008159] pl-4 py-1.5 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800">
          Featured <span className="text-[#009966]">Products</span>
        </h3>




        <Suspense
          fallback={<> <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 justify-items-center">
            {/* تكرار سكيلتون المنتج 8 مرات */}
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div></>}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 justify-items-center">
            {allProudcts.map((product) => { return <ProductCard key={product._id} product={product} /> })}
          </div>

        </Suspense>


      </div>



    </>
  );
}
