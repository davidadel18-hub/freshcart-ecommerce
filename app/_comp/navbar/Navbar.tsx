"use client"

import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { Button } from "@/components/ui/button"

import logo from "../../../assets/images/freshcart-logo.svg"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import { GetUSerCart } from "../actions/getUserCart.action"
import { useQuery } from "@tanstack/react-query"
import GetSingedInUserWishListBtn from "../getSingedinUserWishListBtn/GetSingedInUserWishListBtn"
import GetBrandsBtn from "../getBrandsBtn/GetBrandsBtn"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const { data: sessionData, status } = useSession()

  const {
    data: cart,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: GetUSerCart,
    enabled: status === "authenticated",
    staleTime: 30 * 1000,
    retry: false,
  })

  function handelLogout() {
    setIsMobileMenuOpen(false)

    signOut({
      redirect: true,
      callbackUrl: "/login",
    })
  }

  const categoriesLinks = [
    {
      path: "/allCategories",
      elem: "All Categories",
    },
    {
      path: "/electronics",
      elem: "Electronics",
    },
    {
      path: "/womenFashion",
      elem: "Women's Fashion",
    },
    {
      path: "/menFashion",
      elem: "Men's Fashion",
    },
    {
      path: "/beautyHealth",
      elem: "Beauty & Health",
    },
  ]

  function closeMobileMenu() {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <nav className="relative container mx-auto px-4 py-3 flex items-center justify-between gap-4">

          {/* ================= LOGO ================= */}
          <div className="shrink-0">
            <Link href="/" onClick={closeMobileMenu}>
              <Image
                src={logo}
                alt="freshCart"
                className="w-[120px] sm:w-[140px]"
                priority
              />
            </Link>
          </div>

          {/* ================= DESKTOP NAV ================= */}
          <NavigationMenu className="hidden xl:flex ml-auto">
            <NavigationMenuList className="flex items-center gap-1 xl:gap-2">

              {/* Home */}
              <NavigationMenuItem>
                <Link href="/">
                  <NavigationMenuLink
                    className="
                      text-lg
                      font-medium
                      px-3
                      py-2
                      transition-colors
                      hover:text-[#3AA34A]
                      bg-transparent
                      focus:bg-transparent
                      hover:bg-transparent
                    "
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Shop */}
              <NavigationMenuItem>
                <Link href="/shop">
                  <NavigationMenuLink
                    className="
                      text-lg
                      font-medium
                      px-3
                      py-2
                      transition-colors
                      hover:text-[#3AA34A]
                      bg-transparent
                      focus:bg-transparent
                      hover:bg-transparent
                    "
                  >
                    Shop
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Categories */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="
                    text-lg
                    font-medium
                    px-3
                    py-2
                    transition-colors
                    hover:text-[#3AA34A]
                    bg-transparent
                    focus:bg-transparent
                    hover:bg-transparent
                    data-[state=open]:bg-transparent
                  "
                >
                  Categories
                </NavigationMenuTrigger>

                <NavigationMenuContent>
                  <ul className="grid w-[220px] p-2 bg-white border border-gray-100 rounded-md shadow-md">

                    {categoriesLinks.map((category) => (
                      <li key={category.elem}>
                        <Link href={category.path}>
                          <NavigationMenuLink
                            className="
                              block
                              w-full
                              text-left
                              px-3
                              py-2
                              text-sm
                              rounded-md
                              transition-colors
                              hover:bg-[#F0FDF4]
                              hover:text-[#10b981]
                            "
                          >
                            {category.elem}
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    ))}

                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Brands */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="
                    text-lg
                    font-medium
                    px-3
                    py-2
                    transition-colors
                    hover:text-[#3AA34A]
                    bg-transparent
                    focus:bg-transparent
                    hover:bg-transparent
                  "
                >
                  <GetBrandsBtn />
                </NavigationMenuLink>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex items-center gap-1 sm:gap-2">

            {/* Support - Desktop */}
            <Link href="/contact" className="hidden lg:block">
              <Button
                variant="ghost"
                className="
                  h-auto
                  py-1
                  px-3
                  border-y-0
                  border-l-0
                  border-r
                  border-gray-300
                  rounded-none
                  hover:bg-transparent
                  flex
                  items-center
                  gap-2
                  text-left
                "
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#F2FDF6] text-[#10b981] shrink-0">

                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 448 512"
                    aria-hidden="true"
                  >
                    <path d="M224 64c-79 0-144.7 57.3-157.7 132.7 9.3-3 19.3-4.7 29.7-4.7l16 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-16 0c-53 0-96-43-96-96l0-64C0 100.3 100.3 0 224 0S448 100.3 448 224l0 168.1c0 66.3-53.8 120-120.1 120l-87.9-.1-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 0 40 0c39.8 0 72-32.2 72-72l0-20.9c-14.1 8.2-30.5 12.8-48 12.8l-16 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48l16 0c10.4 0 20.3 1.6 29.7 4.7-13-75.3-78.6-132.7-157.7-132.7z" />
                  </svg>

                </div>

                <div className="flex flex-col select-none">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wide leading-none">
                    Support
                  </span>

                  <span className="text-xs font-bold text-black mt-0.5">
                    24/7 Help
                  </span>
                </div>

              </Button>
            </Link>

            {/* ================= AUTHENTICATED ================= */}
            {status === "authenticated" ? (
              <>
                {/* Wishlist */}
                <GetSingedInUserWishListBtn />

                {/* Cart */}
                <Link href="/cart">
                  <button
                    type="button"
                    className="
                      p-2
                      sm:p-2.5
                      rounded-full
                      transition-colors
                      duration-200
                      hover:bg-[#F3F4F6]
                      text-gray-400
                      hover:text-[#53B97A]
                      flex
                      items-center
                      justify-center
                      cursor-pointer
                    "
                    aria-label="Shopping cart"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>

                    <span
                      className="
                        flex
                        h-5
                        min-w-5
                        items-center
                        justify-center
                        rounded-full
                        bg-[#44B56E]
                        px-1
                        text-xs
                        font-bold
                        text-white
                        ring-2
                        ring-white
                      "
                    >
                      {cart?.numOfCartItems ?? 0}
                    </span>
                  </button>
                </Link>

                {/* Sign Out - Desktop */}
                <Button
                  onClick={handelLogout}
                  className="
                    bg-[#44B56E]
                    hover:bg-[#359e5a]
                    text-white
                    px-4
                    py-2
                    rounded-xl
                    text-base
                    font-medium
                    hidden
                    lg:flex
                    items-center
                    gap-1.5
                    cursor-pointer
                    shadow-sm
                    transition-colors
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>

                  Sign Out
                </Button>
              </>
            ) : (
              /* Sign In - Desktop */
              <Link href="/login" className="hidden lg:block">
                <Button
                  className="
                    bg-[#44B56E]
                    hover:bg-[#359e5a]
                    text-white
                    px-4
                    py-2
                    rounded-xl
                    text-base
                    font-medium
                    flex
                    items-center
                    gap-1.5
                    cursor-pointer
                    shadow-sm
                    transition-colors
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>

                  Sign In
                </Button>
              </Link>
            )}

            {/* ================= MOBILE MENU BUTTON ================= */}
            <button
              type="button"
              onClick={() =>
                setIsMobileMenuOpen((prev) => !prev)
              }
              className="
                p-2
                rounded-full
                bg-[#3aa361]
                text-white
                hover:bg-[#15803D]
                transition-colors
                duration-200
                cursor-pointer
                flex
                xl:hidden
                items-center
                justify-center
              "
              aria-label={
                isMobileMenuOpen
                  ? "Close menu"
                  : "Open menu"
              }
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>

          </div>
        </nav>

        {/* ================= MOBILE MENU ================= */}
        {isMobileMenuOpen && (
          <div
            className="
              xl:hidden
              absolute
              top-full
              left-0
              w-full
              bg-white
              border-t
              border-gray-100
              shadow-lg
              z-50
            "
          >
            <div className="container mx-auto px-4 py-4">

              <div className="flex flex-col gap-1">

                {/* Home */}
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="
                    px-4
                    py-3
                    rounded-lg
                    text-base
                    font-medium
                    hover:bg-[#F0FDF4]
                    hover:text-[#3AA34A]
                    transition-colors
                  "
                >
                  Home
                </Link>

                {/* Shop */}
                <Link
                  href="/shop"
                  onClick={closeMobileMenu}
                  className="
                    px-4
                    py-3
                    rounded-lg
                    text-base
                    font-medium
                    hover:bg-[#F0FDF4]
                    hover:text-[#3AA34A]
                    transition-colors
                  "
                >
                  Shop
                </Link>

                {/* Categories */}
                <div className="border-t border-gray-100 mt-2 pt-2">

                  <p
                    className="
                      px-4
                      py-2
                      text-xs
                      font-bold
                      text-gray-400
                      uppercase
                      tracking-wider
                    "
                  >
                    Categories
                  </p>

                  {categoriesLinks.map((category) => (
                    <Link
                      key={category.elem}
                      href={category.path}
                      onClick={closeMobileMenu}
                      className="
                        block
                        px-4
                        py-3
                        rounded-lg
                        text-base
                        hover:bg-[#F0FDF4]
                        hover:text-[#3AA34A]
                        transition-colors
                      "
                    >
                      {category.elem}
                    </Link>
                  ))}

                </div>

                {/* Brands */}
                <Link
                  href="/brands"
                  onClick={closeMobileMenu}
                  className="
                    px-4
                    py-3
                    rounded-lg
                    text-base
                    font-medium
                    hover:bg-[#F0FDF4]
                    hover:text-[#3AA34A]
                    transition-colors
                  "
                >
                  Brands
                </Link>

                {/* Support */}
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="
                    px-4
                    py-3
                    rounded-lg
                    text-base
                    font-medium
                    hover:bg-[#F0FDF4]
                    hover:text-[#3AA34A]
                    transition-colors
                  "
                >
                  Support
                </Link>

                {/* Divider */}
                <div className="border-t border-gray-100 my-2" />

                {/* Auth */}
                {status === "authenticated" ? (
                  <button
                    type="button"
                    onClick={handelLogout}
                    className="
                      w-full
                      px-4
                      py-3
                      rounded-lg
                      bg-[#44B56E]
                      text-white
                      font-medium
                      hover:bg-[#359e5a]
                      transition-colors
                      text-left
                    "
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={closeMobileMenu}
                    className="
                      px-4
                      py-3
                      rounded-lg
                      bg-[#44B56E]
                      text-white
                      font-medium
                      hover:bg-[#359e5a]
                      transition-colors
                      text-center
                    "
                  >
                    Sign In
                  </Link>
                )}

              </div>

            </div>
          </div>
        )}
      </div>
    </>
  )
}