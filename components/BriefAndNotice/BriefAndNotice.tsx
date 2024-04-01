import { Container, Grid, SimpleGrid, Skeleton, rem } from '@mantine/core';
import HomeNotice from '../HomeNotice/HomeNotice';
import Brief from '../Brief/Brief';

const PRIMARY_COL_HEIGHT = rem(300);

export function BriefAndNotice() {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <Container my="md">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <div style={{height:'400px'}}>
            <HomeNotice/>
        </div>
        <div>
            <HomeNotice/>
        </div>
      </SimpleGrid>
    </Container>
  );
}