import { Container, Grid, GridCol, SimpleGrid, Skeleton, rem } from '@mantine/core';
import HomeNotice from '../HomeNotice/HomeNotice';
import Brief from '../Brief/Brief';

export function BriefAndNotice() {


  return (
    <div style={{backgroundColor:'#F6F6F6',paddingTop:'80px',paddingBottom:'80px'}}>
      <Container size='lg'>
        <Grid >
          <GridCol span={{base:12, md:8, lg:8}}>
              <HomeNotice/>
          </GridCol>
          <GridCol span={{base:12, md:4, lg:4}}>
              <Brief/>
          </GridCol>
        </Grid>
      </Container>
    </div>
  );
}