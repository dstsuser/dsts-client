'use client'
import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import HomeCarousel from '@/components/Carousel/HomeCarousel';
import { Container, Grid } from '@mantine/core';
import { BriefAndNotice } from '@/components/BriefAndNotice/BriefAndNotice';
import { HeroImage } from '@/components/HeroImage/HeroImage';
import { PhotoGrid } from '@/components/PhotoGrid/PhotoGrid';
import { GetInTouch } from '@/components/Contact/GetInTouch';
import AboutAndGoal from '@/components/AboutAndGoal/AboutAndGoal';


export default function HomePage() {
  return (
    <>
        <AboutAndGoal/>
        <BriefAndNotice/>
        <HomeCarousel />
        <ColorSchemeToggle />
        <PhotoGrid/>
        <GetInTouch/>
    </>
  );
}
