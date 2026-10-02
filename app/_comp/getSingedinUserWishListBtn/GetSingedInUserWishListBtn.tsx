"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { GetWishlist } from "../actions/getUserWishList.action";


export default function GetSignedInUserWishlistBtn() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleWishlistClick = async () => {
    try {
      const data = await GetWishlist();

      queryClient.setQueryData(["wishlist"], data);

      router.push("/wishList");
    } catch (error) {
      console.error(error);
    }
  };

  return (
     <button
      onClick={handleWishlistClick}
                      type="button"
                      className="p-2.5 rounded-full transition-colors duration-200 hover:bg-[#F3F4F6] text-gray-400 hover:text-[#53B97A] flex items-center justify-center cursor-pointer"
                      aria-label="Add to wishlist"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    </button>
  );
}