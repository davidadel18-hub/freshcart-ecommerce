"use client";

import React, { type ReactNode } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

  const {
    mutate: addProduct,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: () => AddToCart(productId),

    onSuccess: (res) => {
      console.log("Product added successfully:", res);

      // Update cart data after successfully adding the product
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },

    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });

  return (
    <>
      <button
        onClick={() => addProduct()}
        className={cls}
        disabled={isPending}
      >
        {isPending ? "Adding..." : child}
      </button>

      {isError && (
        <p className="text-red-500 text-sm">
          {error instanceof Error
            ? error.message
            : "Something went wrong"}
        </p>
      )}
    </>
  );
}