import React from 'react'
import { Product } from '../interface/ProductsInterface'
import Image from 'next/image'
import Link from 'next/link';
import AddBtn from '../addBtn/AddBtn';
import AddToWishlistBtn from '../addToWichListBtn/AddToWishList';

export default function ProductCard({ product }: { product: Product }) {

    // Calculates the standard rounded discount rate percentage
    const originalPrice = product.price;
    const salePrice = product.priceAfterDiscount;

    const discountPercentage = salePrice
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
        : 0;

    const renderStars = (rating: number) => {
        const stars = [];
        const floorRating = Math.floor(rating); // Number of fully filled stars

        for (let i = 1; i <= 5; i++) {
            if (i <= floorRating) {
                // Gold Filled Star
                stars.push(
                    <svg key={i} xmlns="http://w3.org" viewBox="0 0 24 24" fill="#FFC107" style={{ width: 16, height: 16 }}>
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                );
            } else {
                // Gray Empty Outline Star
                stars.push(
                    <svg key={i} xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#D1D5DB" style={{ width: 16, height: 16 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.15-.363.68-.363.83 0l2.082 5.006 5.404.434c.39.031.546.518.258.771l-4.117 3.527 1.257 5.273c.09.379-.314.673-.64.478L12 18.354 7.373 21.18c-.328.195-.733-.099-.64-.478l1.257-5.273-4.117-3.527c-.288-.252-.132-.74.258-.771l5.404-.434 2.082-5.005Z" />
                    </svg>
                );
            }
        }
        return stars;
    };


    return (
        <>

            {/* Main Product Card Container */}
            <div    className="transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-md cursor-pointer"
             style={{ position: 'relative', width: '100%', backgroundColor: '#ffffff', border: '1px solid #f3f4f6', borderRadius: 12, padding: 16, boxSizing: 'border-box', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginBottom: 5  }}>
                {/* Right Action Buttons Column */}
                <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {/* Wishlist Button */}

<AddToWishlistBtn productId={product._id}/>

                    {/* <button type="button" aria-label="Add to wishlist" style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #f3f4f6', backgroundColor: '#ffffff', color: '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}>
                        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" style={{ width: 16, height: 16 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </button> */}
                    {/* Compare Button */}
                    {/* <button type="button" aria-label="Compare product" style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #f3f4f6', backgroundColor: '#ffffff', color: '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}>
                        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" style={{ width: 16, height: 16 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3M3 12c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M3 12l-3 3m3-3 3 3" />
                        </svg>
                    </button> */}
                    {/* Quick View Button */}
                    {/* <button type="button" aria-label="Quick view" style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #f3f4f6', backgroundColor: '#ffffff', color: '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}>
                        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" style={{ width: 16, height: 16 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </button> */}
                </div>
                {/* Product Image Area */}
               <Link href={`/productDetils/${product._id}`}>
                <div style={{ width: '100%', aspectRatio: '1 / 1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, boxSizing: 'border-box', marginBottom: 16 }}>
                    {/* Replace src with your actual dynamic product image path */}
                    <Image width={300} height={200} src={product.imageCover} alt={product.title} />
                    {(discountPercentage) ? <div className="absolute top-4 left-4 z-10 bg-[#EF4444] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-md shadow-sm select-none tracking-wider uppercase animate-fade-in">-{discountPercentage}%</div> : null}
                </div>
               </Link> 

                {/* Details & Pricing Footer Block */}
                <div style={{ width: '100%' }}>
                    {/* Category Badge */}
                    <span style={{ display: 'block', fontSize: 11, fontWeight: 500, color: '#9ca3af', letterSpacing: '0.05em', marginBottom: 4 }}>
                        {product.category.slug}
                    </span>
                    {/* Product Title */}
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: '#2D3A4A', margin: '0 0 8px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {product.title}
                    </h3>
                    {/* Rating System */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
                        <div style={{ display: 'flex', gap: 2 }}>
                            {/* Executes the dynamic loop based on your server data */}
                            {renderStars(product.ratingsAverage)}
                        </div>

                        <span style={{ fontSize: 11, fontWeight: 700, color: '#4b5563', marginTop: 2 }}>
                            {product.ratingsAverage}{" "}
                            <span style={{ fontWeight: 500, color: '#9ca3af' }}>
                                ({product.ratingsQuantity})
                            </span>
                        </span>
                    </div>

                    {/* Pricing and Add To Cart Row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 4 }}>
                        {/* Pricing Panel Wrapper */}
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                            {product.priceAfterDiscount ? (
                                <>
                                    {/* Active Discounted Price (Green) */}
                                    <span style={{ fontSize: 18, fontWeight: 800, color: '#10b981' }}>
                                        {product.priceAfterDiscount}
                                    </span>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: '#10b981', marginRight: 4 }}>
                                        EGP
                                    </span>

                                    {/* Old Original Retail Price (Muted Gray with Line-Through) */}
                                    <span style={{ fontSize: 13, fontWeight: 500, color: '#9ca3af', textDecoration: 'line-through' }}>
                                        {product.price} EGP
                                    </span>
                                </>
                            ) : (
                                <>
                                    {/* Regular Base Retail Price (Fallback if there is no discount) */}
                                    <span style={{ fontSize: 18, fontWeight: 800, color: '#0F1A2C' }}>
                                        {product.price}
                                    </span>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: '#0F1A2C' }}>
                                        EGP
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Add To Cart Action Button */}
                     
                        <AddBtn productId={product._id} child={<svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" style={{ width: 20, height: 20, margin: '0 auto' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>} cls = {'w-10 h-10 rounded-full bg-emerald-500 border-none text-white flex items-center cursor-pointer shadow-sm p-0'}/>
                    </div>

                </div>
            </div>
        </>

    )
}
