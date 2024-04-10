'use client'
import { useGetPhotoFramesQuery } from '@/lib/redux/features/photoFrames/photoFramesApi'
import { Button, Container, Grid, Image } from '@mantine/core'
import { useRouter } from 'next/navigation'
import React from 'react'
const classes = require('./PhotoGrid.module.css')

export default function PhotoGrid() {

  const {data,isLoading,isError} = useGetPhotoFramesQuery('')
  const router = useRouter()


  return (
    <div>
        <Container size={'lg'} className={classes.wrapper}>
            <div>
                <h1 className={classes.title}>Photo Gallery</h1>
            </div>
            <Grid>
              {isLoading ? <div>Loading...</div> : isError ? <div>Error...</div> : data?.photoFrames?.slice(0,6)?.map((item:any) => {
                return(
                  <Grid.Col span={{base:12,md:4,lg:4}}>
                    <div className={classes.gridItem}>
                        <Image className={classes.img} src={item?.imageLink} alt={item.altText} width={250} height={250} />
                    </div>
                  </Grid.Col>  
                )
              } )}
            </Grid>
            <div style={{marginTop:'20px',display:'flex',justifyContent:'center'}}>
                <Button onClick={()=>router.push('/photo-gallery')} className={classes.btn}>View More</Button>
            </div>
        </Container>
    </div>
  )
}
