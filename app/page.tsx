'use client'
import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import HomeCarousel from '@/components/Carousel/HomeCarousel';
import { Container, Grid } from '@mantine/core';
import { BriefAndNotice } from '@/components/BriefAndNotice/BriefAndNotice';


export default function HomePage() {
  return (
    <>
      <Container px={0} size="xl">
        <HomeCarousel />
        <BriefAndNotice/>
        <Welcome />
        <ColorSchemeToggle />
      </Container>
    </>
  );
}
