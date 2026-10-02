import React from 'react'

export default function CategoryCardSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50/50 w-full max-w-[210px] h-44 rounded-2xl border border-gray-100 p-4 animate-pulse">
      
      {/* هيكل الصورة الدائرية أو المفرغة المومضة */}
      <div className="flex items-center justify-center flex-1 w-full">
        <div className="w-24 h-20 bg-gray-200 rounded-xl"></div>
      </div>

      {/* هيكل النص المومض */}
      <div className="w-20 h-4 bg-gray-200 rounded-md mt-2"></div>
      
    </div>
  )
}
