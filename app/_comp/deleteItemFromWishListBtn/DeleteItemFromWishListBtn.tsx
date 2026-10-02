"use client";

import { Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { DeleteItemFromWishList } from "../actions/deleteItemFromWishList.action";

type Props = {
  productId: string;
};

export default function DeletItemFromWishListBtn({
  productId,
}: Props) {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      await DeleteItemFromWishList(productId);

      // Remove the deleted product from the current cache immediately
      queryClient.setQueryData(["wishlist"], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: oldData.data.filter(
            (product: any) => product._id !== productId
          ),
        };
      });

      // Refetch the latest wishlist data
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      type="button"
      title="Remove from wishlist"
      onClick={handleDelete}
      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-400 shadow-sm backdrop-blur transition hover:bg-rose-50 hover:text-rose-500"
    >
      <Trash2 size={17} />
    </button>
  );
}