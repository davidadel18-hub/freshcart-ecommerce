import Link from "next/link"
import Image from "next/image"
import logo from "../../../assets/images/freshcart-logo.svg"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">

      <div className="container mx-auto px-4 py-10">

        <div className="flex flex-col items-center text-center">

          {/* Logo */}
          <Link href="/">
            <Image
              src={logo}
              alt="FreshCart"
              className="w-[140px]"
            />
          </Link>

          {/* Project Description */}
          <p className="mt-5 text-gray-500 text-sm max-w-xl leading-6">
            FreshCart is a modern e-commerce application built with
            Next.js, React, Tailwind CSS, and modern web technologies.
          </p>

          {/* Developer */}
          <p className="mt-6 text-gray-700 text-sm">
            Designed & Developed by{" "}
            <span className="font-semibold text-[#3aa361]">
              David Adel
            </span>
          </p>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">

            {/* Portfolio */}
            <a
              href="https://davidadelportfolio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-lg
                bg-gray-100
                text-gray-600
                text-sm
                font-medium
                hover:bg-[#3aa361]
                hover:text-white
                transition-all
                duration-200
              "
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 9.75 12 3l9 6.75M5.25 8.25V21h13.5V8.25M9 21v-6h6v6"
                />
              </svg>

              Portfolio
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/david-adel-a761751b7/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-lg
                bg-gray-100
                text-gray-600
                text-sm
                font-medium
                hover:bg-[#3aa361]
                hover:text-white
                transition-all
                duration-200
              "
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.68H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.56 20.45h3.57V9H3.56v11.45Z" />
              </svg>

              LinkedIn
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/davidadel18-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-lg
                bg-gray-100
                text-gray-600
                text-sm
                font-medium
                hover:bg-[#3aa361]
                hover:text-white
                transition-all
                duration-200
              "
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56v-2.17c-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.71 1.25 3.37.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.17 1.18a11.1 11.1 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.4-5.25 5.69.41.35.77 1.04.77 2.1v3.11c0 .31.21.67.8.56A10.99 10.99 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>

              GitHub
            </a>

          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200">

        <div className="container mx-auto px-4 py-4">

          <p className="text-center text-xs text-gray-400">
            © {new Date().getFullYear()} FreshCart. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  )
}