"use client";

import React, { type ReactNode } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AddToCart } from "../actions/addToCart.action";

export default function AddBtn({
  cls,
  child,
  productId,
}: {
  cls: string;
  child: ReactNode;
  productId: string;
}) {
  const queryClient = useQueryClient();

  const { mutate: addProduct, isPending } = useMutation({
    mutationFn: () => AddToCart(productId),

    onSuccess: (res) => {
      console.log("Add to cart result:", res);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success("Product added to cart");

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },

    onError: (error) => {
      console.error("Error adding product:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    },
  });

  return (
    <button
      type="button"
      onClick={() => addProduct()}
      className={cls}
      disabled={isPending}
    >
      {isPending ? "Adding..." : child}
    </button>
  );
}