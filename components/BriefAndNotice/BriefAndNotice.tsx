'use client'
import { Grid } from '@mantine/core'
import React from 'react'
import HomeNotice from '../HomeNotice/HomeNotice'
import Brief from '../Brief/Brief'

export default function BriefAndNotice() {
  return (
    <Grid>
        <Grid.Col span={6}>
            <HomeNotice/>
        </Grid.Col>
        <Grid.Col span={6}>
            <Brief/>
        </Grid.Col>
    </Grid>
  )
}
