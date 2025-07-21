import { CharacterCard } from '@/components/card/character-card';
import React from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface CarouselProps {
  characters: { url: string; name: string }[];
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
}

export const CardCarousel: React.FC<CarouselProps> = ({
  characters,
  autoplayDelay = 1500,
  showPagination = true,
  showNavigation = true,
}) => {
  const css = `
  .swiper {
    width: 100%;
    padding-bottom: 50px;
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    /* height: 300px; */
    /* margin: 20px; */
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
  }
  
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  `;
  return (
    <section className="w-ace-y-4">
      <style>{css}</style>
      <div className="mx-auto p-2 w-full max-w-7xl">
        <div className="relative flex flex-col md:items-start md:gap-8 mx-auto p-2 md:p-2 rounded-[24px] md:rounded-t-[40px] md:rounded-b-[20px] w-full">
          <div className="flex justify-center items-center gap-4 w-full">
            <div className="w-full">
              <Swiper
                spaceBetween={50}
                autoplay={{
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                }}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                }}
                pagination={false}
                navigation={
                  showNavigation
                    ? {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                      }
                    : undefined
                }
                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
              >
                {characters.map((character, index) => (
                  <SwiperSlide key={index}>
                    <CharacterCard
                      imageHeight="h-[500px]"
                      imageWidth="w-[300px]"
                      characterUrl={character.url}
                      characterName={character.name}
                    />
                  </SwiperSlide>
                ))}
                {characters.map((character, index) => (
                  <SwiperSlide key={index}>
                    <CharacterCard
                      imageHeight="h-[500px]"
                      imageWidth="w-[300px]"
                      characterUrl={character.url}
                      characterName={character.name}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
