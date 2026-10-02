"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UpdateCartItem } from "../actions/changeItemQuantity.action";


type Props = {
  productId: string;
  count: number;
};

export default function ChangeItemQuantityInput({
  productId,
  count,
}: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (newCount: number) =>
      UpdateCartItem(productId, newCount),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("Cart quantity updated");
    },

    onError: (error: Error) => {
      toast.error(error.message || "Failed to update quantity");
    },
  });

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        disabled={isPending || count <= 1}
        onClick={() => mutate(count - 1)}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        -
      </button>

      <span>{count}</span>

      <button
        type="button"
        disabled={isPending}
        onClick={() => mutate(count + 1)}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        +
      </button>
    </div>
  );
}