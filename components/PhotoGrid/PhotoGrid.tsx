import { SimpleGrid, Skeleton, Container, Stack, useMantineTheme, px } from '@mantine/core';

const getChild = (height: number) => <Skeleton height={height} radius="md" animate={false} />;
const BASE_HEIGHT = 360;
const getSubHeight = (children: number, spacing: number) =>
  BASE_HEIGHT / children - spacing * ((children - 1) / children);

export function PhotoGrid() {
  const theme = useMantineTheme();
    const photo1 = <img src="https://source.unsplash.com/random/800x800" alt="Photo 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;
    const photo2 = <img src="https://source.unsplash.com/random/800x800" alt="Photo 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;
    const photo3 = <img src="https://source.unsplash.com/random/800x800" alt="Photo 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;
  const photo4 = <img src="https://source.unsplash.com/random/800x800" alt="Photo 4" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;

  return (
    <Container my="md">
      <SimpleGrid cols={{ base: 1, xs: 4 }}>
        {photo1}
        <Stack>
          {photo2}
          {photo3}
        </Stack>
        <Stack>
          {photo4}
          {photo1}
          {photo2}
        </Stack>
        {photo3}
      </SimpleGrid>
    </Container>
  );
}