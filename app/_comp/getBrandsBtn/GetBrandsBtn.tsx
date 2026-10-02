"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { GetBrands } from "../actions/getBrands.action";

export default function GetBrandsBtn() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleBrandsClick = async () => {
    try {
      const data = await GetBrands();

      queryClient.setQueryData(["brands"], data);

      router.push("/brands");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBrandsClick}
      className="..."
    >
      Brands
    </button>
  );
}