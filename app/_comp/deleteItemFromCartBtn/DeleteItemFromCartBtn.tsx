"use client";

import { Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { DeleteItemFromCart } from "../actions/deleteItemFromCart.action";


type DeleteItemFromCartBtnProps = {
  productId: string;
};

export default function DeleteItemFromCartBtn({
  productId,
}: DeleteItemFromCartBtnProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => DeleteItemFromCart(productId),

    onSuccess: () => {
      toast.success("Product removed from cart");

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },

    onError: (error: Error) => {
      toast.error(error.message || "Failed to remove product");
    },
  });

  return (
    <button
      onClick={() => mutate()}
      disabled={isPending}
      title="Remove from cart"
      className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Trash2 size={18} />
    </button>
  );
}