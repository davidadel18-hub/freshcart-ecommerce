
"use client";

import React, { useState } from "react";
import { Banknote, CreditCard, MapPin, Phone } from "lucide-react";
import { PayCash } from "@/app/_comp/actions/payCash.action";
import { PayOnline } from "@/app/_comp/actions/payOnline.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  params: Promise<{
    cartId: string;
  }>;
};

export default function PaymentMethod({ params }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Get cartId from dynamic route params
  const { cartId } = React.use(params);

  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">(
    "cash"
  );

  const [shippingAdress, setShippingAdress] = useState({
    details: "",
    phone: "",
    city: "",
    postalCode: "",
  });

  const handleShippingAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShippingAdress({
      ...shippingAdress,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // Cash Payment
  // =========================
  const handleCashPayment = async () => {
    try {
      const data = await PayCash(cartId, shippingAdress);

      console.log("Cash Order Response:", data);

      // Update cart data
      await queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("Order placed successfully!");

      router.push("/");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to place order"
      );
    }
  };

  // =========================
  // Online Payment
  // =========================
  const handleOnlinePayment = async () => {
    try {
      const data = await PayOnline(cartId, {
        details: shippingAdress.details,
        phone: shippingAdress.phone,
        city: shippingAdress.city,
      });

      console.log("Online Payment Response:", data);

      const paymentUrl = data?.session?.url;

      if (!paymentUrl) {
        throw new Error("Payment URL not found");
      }

      // Update cart data
      await queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      // Redirect to payment page
      window.location.href = paymentUrl;
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to start online payment"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900">
            Checkout
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Choose your preferred payment method
          </p>
        </div>

        {/* Payment Method */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-bold text-slate-900">
            Payment Method
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Cash */}
            <button
              type="button"
              onClick={() => setPaymentMethod("cash")}
              className={`flex items-center gap-4 rounded-2xl border p-5 text-left transition ${
                paymentMethod === "cash"
                  ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100"
                  : "border-slate-200 bg-white hover:border-emerald-300"
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                  paymentMethod === "cash"
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                <Banknote size={24} />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Cash on Delivery
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Pay when your order arrives
                </p>
              </div>
            </button>

            {/* Online */}
            <button
              type="button"
              onClick={() => setPaymentMethod("online")}
              className={`flex items-center gap-4 rounded-2xl border p-5 text-left transition ${
                paymentMethod === "online"
                  ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100"
                  : "border-slate-200 bg-white hover:border-emerald-300"
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                  paymentMethod === "online"
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                <CreditCard size={24} />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Online Payment
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Pay securely online
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-bold text-slate-900">
            Delivery Information
          </h2>

          <div className="space-y-4">
            {/* Address */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Address
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-3 top-3.5 text-slate-400"
                />

                <input
                  name="details"
                  type="text"
                  value={shippingAdress.details}
                  onChange={handleShippingAddressChange}
                  placeholder="Enter your address"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Phone Number
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-3 top-3.5 text-slate-400"
                />

                <input
                  name="phone"
                  type="tel"
                  value={shippingAdress.phone}
                  onChange={handleShippingAddressChange}
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                City
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-3 top-3.5 text-slate-400"
                />

                <input
                  name="city"
                  type="text"
                  value={shippingAdress.city}
                  onChange={handleShippingAddressChange}
                  placeholder="Enter your city"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {/* Postal Code */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Postal Code
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-3 top-3.5 text-slate-400"
                />

                <input
                  name="postalCode"
                  type="text"
                  value={shippingAdress.postalCode}
                  onChange={handleShippingAddressChange}
                  placeholder="Enter your postal code"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        {paymentMethod === "cash" ? (
          <button
            type="button"
            onClick={handleCashPayment}
            className="mt-6 w-full rounded-xl bg-emerald-500 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-600 hover:shadow-md"
          >
            Place Order
          </button>
        ) : (
          <button
            type="button"
            onClick={handleOnlinePayment}
            className="mt-6 w-full rounded-xl bg-emerald-500 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-600 hover:shadow-md"
          >
            Continue to Payment
          </button>
        )}
      </div>
    </div>
  );
}
