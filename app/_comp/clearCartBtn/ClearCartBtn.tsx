"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ClearCart } from "../actions/clearCart.action";

export default function ClearCartBtn() {
  const queryClient = useQueryClient();

  const {
    mutate: clearCart,
    isPending,
  } = useMutation({
    mutationFn: ClearCart,

    onSuccess: async (res) => {
      toast.success("Your cart has been cleared successfully!", {
        autoClose: 5000,
      });

      // Refresh cart data
      await queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to clear your cart. Please try again.",
        {
          autoClose: 5000,
        }
      );
    },
  });

  return (
    <button
      onClick={() => clearCart()}
      disabled={isPending}
      className="w-1/4 rounded-2xl bg-red-500 p-3 text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isPending ? "Clearing..." : "Clear Cart"}
    </button>
  );
}