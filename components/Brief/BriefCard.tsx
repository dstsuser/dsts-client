import { IconBookmark, IconHeart, IconShare } from '@tabler/icons-react';
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  Avatar,
  useMantineTheme,
  rem,
} from '@mantine/core';
import classes from './BriefCard.module.css';

export default function BriefCard({ data}: { data: any}) {

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
          <Image src={data.avatar} height={220} />
      </Card.Section>
      <div>
        <Text fz="md" py={'sm'} fw={'bold'} fs={'md'} inline>
            {data.fullName}
        </Text>
        <div style={{marginTop:'2px'}}>
            
            <Text fz="sm" mb={'sm'} inline>
                {data?.position}
            </Text>
            <Text fz="sm" inline>
                {data?.organization}
            </Text>
        </div>
      </div>
    </Card>
  );
}