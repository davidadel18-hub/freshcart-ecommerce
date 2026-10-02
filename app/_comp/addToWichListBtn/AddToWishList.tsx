"use client";

import { Heart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AddToWishlist } from "../actions/addToWishList.action";


type Props = {
  productId: string;
};

export default function AddToWishlistBtn({ productId }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => AddToWishlist(productId),

    onSuccess: () => {
      toast.success("Product added to wishlist");

      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },

    onError: (error: Error) => {
      toast.error(error.message || "Failed to add to wishlist");
    },
  });

  return (
    <button
      type="button"
      onClick={() => mutate()}
      disabled={isPending}
      title="Add to wishlist"
      aria-label="Add to wishlist"
      className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Heart size={18} />
    </button>
  );
}