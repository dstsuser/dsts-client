import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";


import classes from './HeaderCarousel.module.css'
import HeaderBanner from "../HeaderBanner/HeaderBanner";
import { useGetHeroBannerQuery } from "@/lib/redux/features/home/homeApi";

function HeaderCarousel() {
  const {data,isLoading,isError,error} = useGetHeroBannerQuery('')

  let content = <div></div>
  if(isLoading){
    content = <div>Loading...</div>
  }else if(isError){
    content = <div>Error: something went wrong </div>
  }else if(data?.heroImages?.length === 0){
    content = <div>No data found</div>
  }else if(data?.heroImages?.length > 0){
    content = <div>
      <Swiper
        navigation
        pagination={{type:'progressbar',clickable:true,dynamicBullets:true}}
        autoplay={{delay: 5000}}
        loop={true}
        mousewheel={true}
        modules={[Autoplay, Navigation, Pagination,EffectFade]}
        effect="fade"
      >
        {data.heroImages.map((item:any, index:any) => (
          <SwiperSlide key={index}>
            <HeaderBanner data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  }

  return (
    <section>
      {content}
    </section>
  );
}
export default HeaderCarousel;

