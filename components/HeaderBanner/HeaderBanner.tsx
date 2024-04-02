import { BackgroundImage, Box, Center, Text } from '@mantine/core'
import React from 'react'
import classes from './HeaderBanner.module.css'

export default function HeaderBanner() {
    // want to set background image for this component
    // want to set text on top of the image
    //backgorund image should be responsive
    // text should be center aligned
    // text should be white
    //full component height should be 95vh
  return (
    <Box mx="auto">
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
  </Box>
  )
}
