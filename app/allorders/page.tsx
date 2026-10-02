"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Package, CheckCircle, Clock } from "lucide-react";
import { GetAllOrders } from "@/app/_comp/actions/getAllOrders.action";
import { toast } from "react-toastify";

type Product = {
  _id: string;
  title: string;
  imageCover: string;
  ratingsAverage: number;
};

type CartItem = {
  count: number;
  _id: string;
  product: Product;
  price: number;
};

type ShippingAddress = {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
};

type Order = {
  _id: string;
  id: number;
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  cartItems: CartItem[];
  createdAt: string;
  paidAt?: string;
};

export default function AllOrders() {
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: GetAllOrders,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-xl font-semibold">Loading orders...</p>
      </div>
    );
  }

  if (isError) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to get orders"
    );

    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-red-500">Failed to load orders.</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Package size={60} className="text-gray-400" />

        <h1 className="text-2xl font-bold">
          You don't have any orders yet
        </h1>

        <p className="text-gray-500">
          Your orders will appear here after checkout.
        </p>
      </div>
    );
  }

  return (
    <section className="mx-auto w-[90%] py-10">
      <h1 className="mb-8 text-3xl font-bold">
        My Orders
      </h1>

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            {/* Order Header */}
            <div className="mb-6 flex flex-col justify-between gap-4 border-b pb-5 md:flex-row md:items-center">
              <div>
                <h2 className="text-xl font-bold">
                  Order #{order.id}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    order.paymentMethodType === "card"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.paymentMethodType === "card"
                    ? "Card"
                    : "Cash"}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    order.isPaid
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Not Paid"}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    order.isDelivered
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {order.isDelivered
                    ? "Delivered"
                    : "Processing"}
                </span>
              </div>
            </div>

            {/* Products */}
            <div className="space-y-4">
              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {item.product.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Quantity: {item.count}
                    </p>
                  </div>

                  <p className="font-bold">
                    {item.price} EGP
                  </p>
                </div>
              ))}
            </div>

            {/* Order Footer */}
            <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="text-sm text-gray-600">
                <p>
                  City: {order.shippingAddress.city}
                </p>

                <p>
                  Phone: {order.shippingAddress.phone}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500">
                  Total Order Price
                </p>

                <p className="text-2xl font-bold text-[#10B981]">
                  {order.totalOrderPrice} EGP
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}