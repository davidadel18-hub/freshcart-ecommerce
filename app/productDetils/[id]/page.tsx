import AddBtn from '@/app/_comp/addBtn/AddBtn';
import AddToWishlistBtn from '@/app/_comp/addToWichListBtn/AddToWishList';
import ProductGallery from '@/app/_comp/ProductGallery/ProductGallery';
import { getSingleProduct } from '@/lib/api/AllProducts/getAllProducts';
import { Quote, Star } from 'lucide-react';
import React from 'react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetails({ params }: PageProps) {
  const resolvedParams = await params;
  const singleProduct = await getSingleProduct(resolvedParams.id);


  const originalPrice = singleProduct.price;
  const salePrice = singleProduct.priceAfterDiscount;

  const discountPercentage = salePrice
    ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
    : 0;


  // Renders star icons dynamically to fit individual product rating values
  const renderStars = (rating: number) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i <= floorRating ? "#FFC107" : "none"}
          stroke={i <= floorRating ? "none" : "#D1D5DB"}
          strokeWidth={i <= floorRating ? 0 : 1.5}
          className="w-5 h-5"
        >
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className=" min-h-screen">
      <div className="container mx-auto px-4 py-8 relative">
        <div className="flex flex-wrap -mx-4 ">

          {/* Integrated Dynamic Client Side Image Component Grid */}
          <ProductGallery
            imageCover={singleProduct.imageCover}
            images={singleProduct.images}
            title={singleProduct.title}
          />


          {/* Fully Connected Product Metadata Display details */}
          <div className="w-full md:w-1/2 px-4">

            <div className="flex gap-2">
              {<div className=" mb-2 w-fit z-10 bg-[#DCFCE7] text-[#5B803D] text-[11px] font-extrabold px-2.5 py-1 rounded-md shadow-sm select-none tracking-wider uppercase animate-fade-in">{singleProduct.category.name}</div>}
              {<div className=" mb-2 w-fit z-10 bg-[#F3F4F6] text-black text-[11px] font-extrabold px-2.5 py-1 rounded-md shadow-sm select-none tracking-wider uppercase animate-fade-in">{singleProduct.brand.name}</div>}
              <AddToWishlistBtn productId={singleProduct._id} />
            </div>
            <h2 className="text-3xl font-extrabold mb-2 text-slate-800 leading-tight">
              {singleProduct.title}
            </h2>


            {/* Dynamic Star Ratings Layout Row */}
            <div className="flex items-center gap-1.5 mb-6">
              <div className="flex gap-0.5 select-none">{renderStars(singleProduct.ratingsAverage)}</div>
              <span className="ml-1 text-sm font-bold text-gray-600 mt-0.5">
                {singleProduct.ratingsAverage} <span className="font-medium text-gray-400">({singleProduct.ratingsQuantity || 0} reviews)</span>
              </span>
            </div>

            {/* Dynamic Price Display Logic */}
            <div className="mb-6 flex items-baseline gap-3">
              {singleProduct.priceAfterDiscount ? (
                <>
                  <span className="text-3xl font-black text-black">{singleProduct.priceAfterDiscount} EGP</span>
                  <span className="text-gray-400 line-through text-sm font-semibold">{singleProduct.price} EGP</span>
                </>
              ) : (
                <span className="text-3xl font-black text-slate-900">{singleProduct.price} EGP</span>
              )}
              {(discountPercentage) ? <div className=" mb-2 w-fit z-10 bg-[#EF4444] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-md shadow-sm select-none tracking-wider uppercase animate-fade-in">save {discountPercentage}%</div> : null}

            </div>

            {singleProduct?.quantity && singleProduct.quantity > 0 ? (
              <div className="mb-4 w-fit bg-[#F3F4F6] text-[#5B803D] text-[11px] font-extrabold px-2.5 py-1.5 rounded-md shadow-sm select-none tracking-wider uppercase animate-fade-in flex items-center gap-2">
                {/* SVG Dynamic Status Indicator */}
                <svg
                  viewBox="0 0 16 16"
                  className="w-3.5 h-3.5 fill-[#10b981] shrink-0"
                  aria-hidden="true"
                >
                  <circle cx="8" cy="8" r="4" />
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    className="opacity-40 animate-pulse"
                  />
                </svg>

                {/* Label Text */}
                <span>In Stock</span>
              </div>
            ) : (
              /* Out of Stock Fallback Variant Badge */
              <div className="mb-4 w-fit bg-red-50 text-red-600 text-[11px] font-extrabold px-2.5 py-1.5 rounded-md shadow-sm select-none tracking-wider uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                <span>Out of Stock</span>
              </div>
            )}



            <p className="text-gray-600 mb-6 leading-relaxed text-sm max-w-xl">
              {singleProduct.description}
            </p>

            {/* Control Forms Action Node Blocks */}
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">Quantity:</label>
              <div className="flex gap-2">
                {/* <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min={1}
                  max={singleProduct.quantity}
                  defaultValue={1}
                  className="w-16 px-2 py-1.5 text-center rounded-md border border-gray-200 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-[#10b981]"
                /> */}

                <span className="text-xs text-gray-400 block mt-1.5 font-medium">  {singleProduct.quantity} available</span></div>
            </div>

            <div className="flex space-x-4 mb-8">
              {/* <button className="bg-[#10b981] hover:bg-[#099264] flex gap-2 items-center text-white px-8 py-3 rounded-xl font-bold transition shadow-sm hover:shadow cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                Add to Cart
              </button> */}
              <AddBtn productId={singleProduct._id} child={<><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
                Add to Cart</>} cls={"bg-[#10b981] hover:bg-[#099264] flex gap-2 items-center text-white px-8 py-3 rounded-xl font-bold transition shadow-sm hover:shadow cursor-pointer"} />





            </div>
            {/* <div className='bg-amber-700'>{singleProduct.reviews.map((e)=><p>{e.review}</p>)}</div> */}

          </div>
          <div className="container mx-auto bg-gray-50 ">

            {/* عنوان القسم */}
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-950">Customer Reviews</h2>
              <p className="mt-2 text-sm md:text-base text-slate-500">We value your trust and always aim to provide the best experience.</p>
            </div>

            {/* شبكة الكروت */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {singleProduct.reviews.map((review) => (
                <div
                  key={review._id}
                  className="relative flex flex-col justify-between p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition duration-300"
                >
                  {/* أيقونة اقتباس خلفية جمالية */}
                  <div className="absolute top-6 left-6 text-slate-100 pointer-events-none">
                    <Quote size={40} className="transform rotate-180" />
                  </div>

                  {/* محتوى التقييم */}
                  <div className="relative z-10">
                    {/* النجوم */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`}
                        />
                      ))}
                    </div>

                    {/* نص التعليق */}
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 line-clamp-4">
                      "{review.review}"
                    </p>
                  </div>

                  {/* بيانات العميل الشخصية */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                    {/* <div className="h-11 w-11 flex-shrink-0 overflow-hidden rounded-full bg-slate-100">
                  <img src={review.user.} alt={review.name} className="h-full w-full object-cover" />
                </div> */}
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800 text-sm md:text-base">{review.user?.name ?? "مستخدم"}</span>

                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
