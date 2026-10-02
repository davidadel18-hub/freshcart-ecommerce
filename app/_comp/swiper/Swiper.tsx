// Import Swiper React components
'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

type SwiperComponentProps = {
  spaceBetween: number;
  slidesPerView: number;
  src: string[];
};

export default function SwiperComponent({ spaceBetween, slidesPerView, src }: SwiperComponentProps) {
  return (
    <Swiper
      autoplay={{ 
        delay: 3000,
        disableOnInteraction: false 
      }}
      loop={true}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      // 💡 تم إضافة Autoplay هنا لتفعيل الميزة
      modules={[ Pagination, Autoplay]}
     
      pagination={{
        clickable: true,
        renderBullet: (index, className) => {
          return `<span class="${className} bg-green-300! swiper-pagination-bullet-active:bg-green-600! swiper-pagination-bullet-active:w-8! w-4! h-2! rounded-full! opacity-100! transition-all! duration-300! "></span>`;
        }
      }}
      scrollbar={{ draggable: true }}
    >
      {src.map((imageSrc) => { 
        return (
          <SwiperSlide key={imageSrc}>
            <Image className="w-full h-100 object-cover" width={400} height={300} src={imageSrc} alt="slide image" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
