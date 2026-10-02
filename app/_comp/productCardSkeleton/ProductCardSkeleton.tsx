import React from 'react'

export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-white w-full max-w-[280px] h-[400px] rounded-2xl border border-gray-100 p-4 animate-pulse justify-between">
      
      {/* 1. هيكل صورة المنتج */}
      <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>

      {/* حاوية التفاصيل السفلى */}
      <div className="flex flex-col flex-1 gap-2">
        {/* 2. هيكل التصنيف أو الشركة المصنعة (خط صغير) */}
        <div className="w-16 h-3 bg-gray-200 rounded"></div>

        {/* 3. هيكل اسم المنتج (سطرين لعرض واقعي) */}
        <div className="w-full h-4 bg-gray-200 rounded"></div>
        <div className="w-3/4 h-4 bg-gray-200 rounded"></div>

        {/* 4. هيكل النجوم أو التقييم */}
        <div className="w-24 h-3 bg-gray-200 rounded mt-1"></div>
      </div>

      {/* حاوية السعر والزر في الأسفل */}
      <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-50">
        {/* 5. هيكل السعر */}
        <div className="flex flex-col gap-1">
          <div className="w-16 h-5 bg-gray-200 rounded"></div>
        </div>

        {/* 6. هيكل زر الإضافة للسلة (دائري أو مستطيل صغير) */}
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
      </div>

    </div>
  )
}
