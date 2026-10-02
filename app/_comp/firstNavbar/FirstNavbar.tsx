'use client'

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function TopUtilityBar() {

  const sessionData =  useSession()

    return (
        <div className="w-full  border-b border-gray-200 hidden lg:block">
            <div className="container mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-600 gap-2">

                {/* Left Side: Marketing Info */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 justify-center sm:justify-start">
                    <div className="flex items-center gap-1.5 font-medium">
                        {/* Truck Icon */}
                        <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#10b981]">
                            <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15H1.5v.75c0 1.036.84 1.875 1.875 1.875h.562a2.25 2.25 0 0 1 4.126 0h4.874a2.25 2.25 0 0 1 4.126 0h.562c1.036 0 1.875-.84 1.875-1.875V15H13.5Z" />
                            <path d="M22.5 10.5h-7.5v4.5h9v-2.25a2.25 2.25 0 0 0-1.5-2.25Z" />
                            <path d="M15 6.75h4.142c.497 0 .973.2 1.325.553l1.98 1.98c.352.352.553.828.553 1.325V12H15V6.75Z" />
                        </svg>
                        <span>Free Shipping on Orders 500 EGP</span>
                    </div>

                    <div className="flex items-center gap-1.5 font-medium">
                        {/* Gift/Box Icon */}
                        <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#10b981]">
                            <path d="M9.375 3a1.875 1.875 0 0 0 0 3.75h1.875v4.5H3.375A1.875 1.875 0 0 1 1.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0 1 12 2.753a3.375 3.375 0 0 1 5.432 4.072h3.193c1.035 0 1.875.84 1.875 1.875v.75a1.875 1.875 0 0 1-1.875 1.875h-7.875v-4.5h1.875a1.875 1.875 0 1 0 0-3.75H9.375Z" />
                            <path d="M12.75 12.75h7.875v5.625c0 1.036-.84 1.875-1.875 1.875h-6c-1.036 0-1.875-.84-1.875-1.875v-5.625h1.875Z" />
                            <path d="M3.375 12.75h7.875v7.5H5.25c-1.036 0-1.875-.84-1.875-1.875v-5.625Z" />
                        </svg>
                        <span>New Arrivals Daily</span>
                    </div>
                </div>

                {/* Right Side: Contact info & Auth actions */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-5 justify-center sm:justify-end">
                    <a href="tel:+18001234567" className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                        {/* Phone Icon */}
                        <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-gray-400">
                            <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l.548 2.192a3 3 0 0 1-.83 2.828l-1.01 1.01A12.115 12.115 0 0 0 8.25 14.25l1.01-1.01a3 3 0 0 1 2.83-.83l2.192.549a3 3 0 0 1 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C6.042 22.5 1.5 17.958 1.5 12.25V4.5Z" clipRule="evenodd" />
                        </svg>
                        <span>+1 (800) 123-4567</span>
                    </a>

                    <a href="mailto:support@freshcart.com" className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                        {/* Envelope Icon */}
                        <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-gray-400">
                            <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a1.5 1.5 0 0 1-1.644 0L1.5 8.67Z" />
                            <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a.75.75 0 0 0 .822 0L22.5 6.908Z" />
                        </svg>
                        <span>support@freshcart.com</span>
                    </a>

                    {/* Right vertical line divider matching your style */}
                    <div className="hidden sm:block h-3 border-r border-gray-300 mx-1"></div>

                   {(sessionData.status==='authenticated')? 
                   null
                   :
                   <>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="flex items-center gap-1.5 hover:text-[#10b981] transition-colors cursor-pointer">
                            {/* User Sign In Icon */}
                            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            <span>Sign In</span>
                        </Link>

                        <Link href="/register" className="flex items-center gap-1.5 hover:text-[#10b981] transition-colors cursor-pointer font-medium">
                            {/* User Add/Sign Up Icon */}
                            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                            </svg>
                            <span>Sign Up</span>
                        </Link>
                    </div>

                   </>}
                </div>

            </div>
        </div>
    );
}
