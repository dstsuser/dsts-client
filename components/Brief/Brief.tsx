import { Card, Grid, Text } from '@mantine/core'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination,Autoplay,Mousewheel } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import BriefCard from './BriefCard';
import { useGetAllFacesQuery } from '@/lib/redux/features/faces/facesApi';
const classes = require('./Brief.module.css')


export default function Brief() {

    const {isLoading,isError,data} = useGetAllFacesQuery('')

  return (
    <div>
      <h2 className={classes.title}>Faces of DSTS</h2>
        <div >
            <Swiper 
                modules={[Pagination,Autoplay,Mousewheel]}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                mousewheel={true}
                className={classes.swiper}
            >
            {
              isLoading ? <div>Loading...</div> : isError ? <div>Error...</div> : data?.facesOfOrg?.map((item:any) => {
                return( 
                    <SwiperSlide key={item._id}>
                        <BriefCard data={item} key={item._id} />
                    </SwiperSlide>
                 )
              })
            } 
            </Swiper>
        </div>
    </div>
  )
}
