'use client'
import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import HomeCarousel from '@/components/Carousel/HomeCarousel';
import { Container, Grid } from '@mantine/core';
import { BriefAndNotice } from '@/components/BriefAndNotice/BriefAndNotice';
import { HeroImage } from '@/components/HeroImage/HeroImage';
import { GetInTouch } from '@/components/Contact/GetInTouch';
import AboutAndGoal from '@/components/AboutAndGoal/AboutAndGoal';
import AboutUs from '@/components/AboutAndGoal/About';
import Goal from '@/components/AboutAndGoal/Goal';
import { ContactUs } from '@/components/ContactUs/ContactUs';
import PhotoGrid from '@/components/PhotoGrid/PhotoGrid';


export default function HomePage() {
  return (
    <>
        <BriefAndNotice/>
        <AboutUs/>
        <Goal/>
        <PhotoGrid/>
        <HomeCarousel/>
        <ContactUs/>
    </>
  );
}
