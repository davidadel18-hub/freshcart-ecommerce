import Image from 'next/image'
import React from 'react'
import { Category } from '../interface/ProductsInterface'

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="flex flex-col items-center justify-center bg-white w-full   rounded-2xl border border-gray-100 p-4 transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-1 cursor-pointer">
      {/* حاوية الصورة المفرغة */}
      <div className="flex items-center justify-center flex-1 w-full relative">
        <Image 
          src={category.image} 
          alt={category.name} 
          width={110} 
          height={90} 
          className="object-cover rounded-full" // للحفاظ على أبعاد صورة الآلة الموسيقية دون تمطيط
        />
      </div>

      {/* اسم التصنيف */}
      <span className="text-slate-700 font-semibold text-base tracking-wide mt-2">
        {category.name}
      </span>
    </div>
  )
}
