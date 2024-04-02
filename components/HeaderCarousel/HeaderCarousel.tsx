import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";

import '@/components/HeaderCarousel/HeaderCarousel.css'


import classes from './HeaderCarousel.module.css'
import HeaderBanner from "../HeaderBanner/HeaderBanner";

function HeaderCarousel() {

  return (
    <section>
      <Swiper
        navigation
        pagination={{type:'progressbar',clickable:true,dynamicBullets:true}}
        autoplay={{delay: 5000}}
        loop={true}
        mousewheel={true}
        modules={[Autoplay, Navigation, Pagination,EffectFade]}
        effect="fade"
        // className={`${`classes.swiper-button-prev`} ${`classes.swiper-button-next`}`}
        
        // style={{ '--swiper-navigation-color': 'red' }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <HeaderBanner data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
export default HeaderCarousel;

const data = [
  {
    image: 'https://source.unsplash.com/random/800x600',
    title: 'Hello',
    subtitle: 'Lorem ipsum dolor sit amet.',
    buttonText: 'Learn More',
    buttonLink: '#'
  },
  {
    image: 'https://source.unsplash.com/random/800x600',
    title: 'Hello',
    subtitle: 'Lorem ipsum dolor sit amet.',
    buttonText: 'Learn More',
    buttonLink: '#'
  },
  {
    image: 'https://source.unsplash.com/random/800x600',
    title: 'Hello',
    subtitle: 'Lorem ipsum dolor sit amet.',
    buttonText: 'Learn More',
    buttonLink: '#'
  },
]