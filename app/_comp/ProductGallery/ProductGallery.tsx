"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
    imageCover: string;
    images: string[];
    title: string;
}

export default function ProductGallery({ imageCover, images, title }: ProductGalleryProps) {
    // Sets the initial featured photo slot state to match the base cover image
    const [activeImage, setActiveImage] = useState(imageCover);

    return (
        <div className="w-full md:w-1/2 px-4 mb-8">
            {/* Featured Main Image Node Container */}
            <div className="w-full h-auto rounded-lg shadow-md mb-4 overflow-hidden bg-white flex items-center justify-center p-4">
                <Image
                    width={500}
                    height={500}
                    src={activeImage}
                    alt={title}
                    className="w-full h-auto max-h-[450px] object-contain transition-all duration-300"
                    priority
                />
            </div>

            {/* Thumbnails Dynamic Map Collection Array */}
            <div className="flex gap-4 py-4 justify-center overflow-x-auto select-none">
                {images?.map((image, index) => (
                    <div
                        key={index}
                        onClick={() => setActiveImage(image)}
                        className={`size-16 sm:size-20 relative rounded-md border-2 cursor-pointer overflow-hidden transition-all duration-200 ${activeImage === image
                                ? 'border-[#10b981] opacity-100 scale-95 shadow-sm'
                                : 'border-transparent opacity-60 hover:opacity-100'
                            }`}
                    >
                        <Image
                            fill
                            src={image}
                            alt={`${title || 'Product'} thumbnail ${index + 1}`}
                            className="object-cover"
                            sizes="(max-width: 640px) 64px, 80px"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
