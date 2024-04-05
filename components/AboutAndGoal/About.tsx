import { Container, Grid, Image, Paper, Text } from '@mantine/core'
import React from 'react'
import classes from './AboutAndGoal.module.css'
import { useGetActiveAboutUsQuery } from '@/lib/redux/features/aboutUs/aboutUsApi'

export default function AboutUs() {

  const {data,isLoading,isError,error} = useGetActiveAboutUsQuery('')

  let content = <div></div>
  if(isLoading){
    content = <div>Loading...</div>
  }else if(isError){
    content = <div>Error</div>
  }else if(data?.aboutUsData){
    content = (
          <Grid gutter={{ base: 5, xs: 'md', md: 60, xl: 50 }}>
              <Grid.Col span={{ base: 12, md: 6 }} >
                  <Image src={data?.aboutUsData?.imageLink} alt="About Us" className={classes.image}/>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 6 }} className={classes.aboutText}>
                  <Text
                      className={classes.title}
                      >
                      About Us
                  </Text>
                  <Text className={classes.contentParagraph}>
                  {data?.aboutUsData?.content}
                  </Text>
              </Grid.Col>
            </Grid>
    )
  }


  return (
    <Container size={'lg'} py={'xl'}>
        <Paper className={classes.wrapper}>
            {
              content
            }
        </Paper>
    </Container>
  )
}
