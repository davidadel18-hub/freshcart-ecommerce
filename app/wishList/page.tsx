"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import AddBtn from "../_comp/addBtn/AddBtn";
import DeletItemFromWishListBtn from "../_comp/deleteItemFromWishListBtn/DeleteItemFromWishListBtn";
import { GetWishlist } from "../_comp/actions/getUserWishList.action";

type WishlistProduct = {
  _id: string;
  title: string;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  category?: {
    name: string;
  };
};

export default function Wishlist() {
  const { data: wishlist } = useQuery({
    queryKey: ["wishlist"],
    queryFn: GetWishlist,
  });

  const products: WishlistProduct[] = wishlist?.data ?? [];

  if (products.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50">
            <Heart
              size={42}
              className="text-emerald-500"
              strokeWidth={1.5}
            />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Your Wishlist is Empty
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Save your favorite products here and come back whenever you're
            ready to buy.
          </p>

          <Link
            href="/products"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#10b981] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#099264] hover:shadow-md"
          >
            Explore Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/50">
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2">
            <Heart
              size={22}
              className="text-emerald-500"
              fill="currentColor"
            />

            <span className="text-sm font-bold uppercase tracking-wider text-emerald-600">
              Your Favorites
            </span>
          </div>

          <h1 className="text-3xl font-black text-slate-900 md:text-4xl">
            My Wishlist
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {products.length}{" "}
            {products.length === 1 ? "product" : "products"} saved for later
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            const hasDiscount =
              product.priceAfterDiscount !== undefined &&
              product.priceAfterDiscount < product.price;

            return (
              <div
                key={product._id}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <Link href={`/productDetils/${product._id}`}>
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </Link>

                  {hasDiscount && (
                    <span className="absolute left-3 top-3 rounded-md bg-red-500 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
                      Sale
                    </span>
                  )}

                  <DeletItemFromWishListBtn productId={product._id} />
                </div>

                <div className="p-4">
                  {product.category?.name && (
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">
                      {product.category.name}
                    </span>
                  )}

                  <Link href={`/productDetils/${product._id}`}>
                    <h2 className="mt-1 min-h-[48px] line-clamp-2 text-base font-bold leading-6 text-slate-800 transition hover:text-emerald-600">
                      {product.title}
                    </h2>
                  </Link>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-lg font-black text-slate-900">
                      {hasDiscount
                        ? product.priceAfterDiscount
                        : product.price}{" "}
                      EGP
                    </span>

                    {hasDiscount && (
                      <span className="text-xs font-semibold text-slate-400 line-through">
                        {product.price} EGP
                      </span>
                    )}
                  </div>

                  <div className="mt-4">
                    <AddBtn
                      productId={product._id}
                      cls="flex w-full items-center justify-center gap-2 rounded-xl bg-[#10b981] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#099264] hover:shadow-md"
                      child={
                        <div className="flex items-center gap-2">
                          <ShoppingCart size={17} />
                          Add To Cart
                        </div>
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}