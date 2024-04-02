import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import HeaderBanner from '../HeaderBanner/HeaderBanner';
import { BackgroundImage, Center, Text } from '@mantine/core';

function HeaderCarousel() {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  return (
    <Carousel
      withIndicators
    //   height={200}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    //   style={{position:'absolute'}}
    >
      <Carousel.Slide>
      <BackgroundImage
      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png"
      style={{ height: '92vh',backgroundRepeat:'no-repeat',backgroundAttachment:'fixed' }}
    >
      <Center p="md">
        <Text c="white">
          BackgroundImage component can be used to add any content on image. It is useful for hero
          headers and other similar sections
        </Text>
      </Center>
    </BackgroundImage>
      </Carousel.Slide>
      <Carousel.Slide>
        <HeaderBanner/>
      </Carousel.Slide>
      <Carousel.Slide>
        <HeaderBanner/>
      </Carousel.Slide>
    </Carousel>
  );
}
export default HeaderCarousel;