import { useGetPhotoFramesQuery } from '@/lib/redux/features/photoFrames/photoFramesApi';
import { SimpleGrid, Skeleton, Container, Stack, useMantineTheme, px, Image, Grid, GridCol } from '@mantine/core';

const getChild = (height: number) => <Skeleton height={height} radius="md" animate={false} />;
const BASE_HEIGHT = 360;
const getSubHeight = (children: number, spacing: number) =>
  BASE_HEIGHT / children - spacing * ((children - 1) / children);

export function PhotoGrid() {

  const {data,isLoading,isError} = useGetPhotoFramesQuery('')

  const photo1 = <img src="https://source.unsplash.com/random/800x800" alt="Photo 1" />;
  const photo2 = <img src="https://source.unsplash.com/random/800x800" alt="Photo 2" />;
  const photo3 = <img src="https://source.unsplash.com/random/800x800" alt="Photo 3" />;
const photo4 = <img src="https://source.unsplash.com/random/800x800" alt="Photo 4"  />

  let photoFrameContent = <div></div>
  if(isLoading){
    photoFrameContent = <div>Loading...</div>
  }else if(isError){
    photoFrameContent = <div>Error...</div>
  }else if(data?.photoFrames.length<=0){
    photoFrameContent = <div>No data...</div>
  }else if(data?.photoFrames.length>0){
    photoFrameContent = 
    <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <Grid>
              <GridCol span={{base:12, md:6,lg:6}}>
                <div style={{height:'300px',overflow:'hidden'}}>
                  <Image height={'100%'} src={data.photoFrames[0].imageLink} alt="Photo 1" />
                </div>
              </GridCol>
              <GridCol span={{base:12, md:6,lg:6}}>
                <div style={{height:'150px'}}>
                  <Image height={'100%'} src={data.photoFrames[0].imageLink} alt="Photo 2" />
                </div>
                <div style={{height:'150px'}} >
                  <Image  height={'100%'} src={data.photoFrames[0].imageLink} alt="Photo 2" />
                </div>
              </GridCol>
            </Grid>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Grid>
              <Grid.Col span={{base:12, md:6,lg:6}}>
                <div style={{height:'150px'}}>
                  <Image height={'100%'} src={data.photoFrames[0].imageLink} alt="Photo 1" />
                </div>
                <div style={{height:'150px'}}>
                  <Image height={'100%'} src={data.photoFrames[0].imageLink} alt="Photo 1" />
                </div>
              </Grid.Col>
            </Grid>
        </Grid.Col>
    </Grid>
  }


  const theme = useMantineTheme();


  return (
    <Container size={'lg'} mah={'300px'}>
        {photoFrameContent}
    </Container>
  );
}