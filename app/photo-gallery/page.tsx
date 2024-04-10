'use client'
import { useGetPhotoFramesQuery } from '@/lib/redux/features/photoFrames/photoFramesApi'
import { Container, Grid, Image } from '@mantine/core'
import React from 'react'
const classes = require('./photoGallery.module.css')

export default function page() {

    const {data,isLoading,isError} = useGetPhotoFramesQuery('');


  return (
    <div>
    <Container size={'lg'} className={classes.wrapper}>
        <div>
            <h1>Photo Gallery</h1>
        </div>
        <Grid>
          {isLoading ? <div>Loading...</div> : isError ? <div>Error...</div> : data?.photoFrames?.map((item:any) => {
            return(
              <Grid.Col span={{base:12,md:4,lg:4}}>
                <div className={classes.gridItem}>
                    <Image className={classes.img} src={item?.imageLink} alt={item.altText} width={250} height={250} />
                </div>
              </Grid.Col>  
            )
          } )}
        </Grid>
    </Container>
</div>
  )
}
