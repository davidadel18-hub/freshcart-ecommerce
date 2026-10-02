"use client";

import React, { useEffect } from "react";
import { Trash2, Heart, Plus, Minus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { GetUSerCart } from "../_comp/actions/getUserCart.action";
import type { Cart } from "../_comp/interface/cartInterface";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import ClearCartBtn from "../_comp/clearCartBtn/ClearCartBtn";
import DeleteItemFromCartBtn from "../_comp/deleteItemFromCartBtn/DeleteItemFromCartBtn";
import ChangeItemQuantityInput from "../_comp/changeItemQuantityInput/changeItemQuantityInput";
import AddToWishlistBtn from './../_comp/addToWichListBtn/AddToWishList';

export default function CartPage() {
  const { status } = useSession();

  const {
    data: cart,
    isLoading,
    isError,
    error,
  } = useQuery<Cart>({
    queryKey: ["cart"],
    queryFn: GetUSerCart,
    enabled: status === "authenticated",
    staleTime: 30 * 1000,
    retry: false,
  });

 // Loading Toast
useEffect(() => {
  if (status === "loading" || isLoading) {
    toast.info("Loading your cart...", {
      toastId: "cart-loading",
      autoClose: 5000,
    });
  } else {
    toast.dismiss("cart-loading");
  }

  return () => {
    toast.dismiss("cart-loading");
  };
}, [status, isLoading]);

// Not Authenticated Toast
useEffect(() => {
  if (status === "unauthenticated") {
    toast.error("Please log in to view your cart.", {
      toastId: "cart-unauthenticated",
      autoClose: 5000,
    });
  }
}, [status]);

// Error Toast
useEffect(() => {
  if (isError) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to load your cart.",
      {
        toastId: "cart-error",
        autoClose: 5000,
      }
    );
  }
}, [isError, error]);

  const products = cart?.data?.products ?? [];

  // Empty cart
  if (products.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-xl font-semibold text-slate-800">
          Your cart is empty
        </h2>

        <Link
          href="/"
          className="mt-4 inline-block rounded-lg bg-[#10B981] px-5 py-2 text-white"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

      {/* Table Header */}
      <div className="hidden grid-cols-12 gap-4 border-b border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-600 md:grid">
        <div className="col-span-6">Product</div>
        <div className="col-span-2 text-center">Price</div>
        <div className="col-span-2 text-center">Quantity</div>
        <div className="col-span-2 text-left">Total</div>
      </div>

      {/* Products */}
      <div className="divide-y divide-slate-100">
        {products.map((item) => {
          // Assuming the cart item quantity field is "count"
          const count = item.count;

          return (
            <div
              key={item._id}
              className="grid grid-cols-1 items-center gap-4 p-4 md:grid-cols-12"
            >
              {/* Product Info */}
              <div className="col-span-1 flex items-center gap-4 md:col-span-6">
                <Link href={`/productDetils/${item.product._id}`}>
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                </Link>

                <div className="flex min-w-0 flex-col gap-1">
                  <Link
                    href={`/productDetils/${item.product._id}`}
                    className="line-clamp-1 text-sm font-medium text-slate-800 hover:text-[#059669] md:text-base"
                  >
                    {item.product.title}
                  </Link>

                  <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                    {item.product.brand?.name && (
                      <span>
                        Brand:{" "}
                        <b className="text-slate-700">
                          {item.product.brand.name}
                        </b>
                      </span>
                    )}

                    {item.product.category?.name && (
                      <span>
                        Category:{" "}
                        <b className="text-slate-700">
                          {item.product.category.name}
                        </b>
                      </span>
                    )}
                  </div>

                  {item.product.quantity <= 100 &&
                    item.product.quantity > 0 && (
                      <span className="text-xs font-medium text-rose-500">
                        Only {item.product.quantity} left in stock
                      </span>
                    )}
                </div>
              </div>

              {/* Unit Price */}
              <div className="col-span-1 flex items-center justify-between text-right text-slate-600 md:col-span-2 md:block md:text-center">
                <span className="text-xs text-slate-400 md:hidden">
                  Item price:
                </span>

                <span className="font-medium">
                  EGP{item.price.toFixed(2)}
                </span>
              </div>

              {/* Quantity & Actions */}
              <div className="col-span-1 flex items-center justify-between gap-3 md:col-span-2 md:flex-col md:justify-center lg:flex-row">
                <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
                
<ChangeItemQuantityInput productId={item.product._id}
  count={item.count}/>
                  

                  {/* <button
                    disabled={count >= item.product.quantity}
                    title="Increase quantity"
                    className="p-1 text-slate-400 transition hover:text-slate-700 disabled:opacity-30"
                  >
                    <Plus size={16} />
                  </button> */}
                </div>

                {/* Wishlist & Remove */}
                <div className="flex gap-1">
                <AddToWishlistBtn productId={item.product._id}/>

                  <DeleteItemFromCartBtn productId={item.product._id}/>
                </div>
              </div>

              {/* Total Price */}
              <div className="col-span-1 flex items-center justify-between text-right font-semibold text-slate-800 md:col-span-2 md:block md:text-left">
                <span className="text-xs text-slate-400 md:hidden">
                  Total:
                </span>

                <span>
                  EGP{(item.price * count).toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex w-full justify-around mb-5">     <ClearCartBtn/> <Link
  className="w-1/4 rounded-2xl bg-[#10B981] p-4 text-center text-white"
  href={`/payNow/${cart?.cartId}`}
>
  Proceed to Checkout
</Link>
</div>
   </div>
  );
}