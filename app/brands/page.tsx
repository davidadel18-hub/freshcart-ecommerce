"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { GetBrands } from "../_comp/actions/getBrands.action";



type Brand = {
  _id: string;
  name: string;
  image: string;
};

export default function Brands() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["brands"],
    queryFn: GetBrands,
  });

  const brands: Brand[] = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg font-semibold text-slate-500">
          Loading brands...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg font-semibold text-red-500">
          Failed to load brands
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/50">
      <div className="container mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 md:text-4xl">
            Top Brands
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Discover all available brands
          </p>
        </div>

        {/* Brands */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="group overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-xl bg-slate-50">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-contain p-6 transition duration-300 group-hover:scale-110"
                />
              </div>

              {/* Brand Name */}
              <div className="mt-4 text-center">
                <h2 className="text-lg font-bold text-slate-800 transition group-hover:text-emerald-600">
                  {brand.name}
                </h2>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}