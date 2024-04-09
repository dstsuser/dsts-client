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
          <Image src={data.user.avatar} height={220} />
      </Card.Section>

      <Text fz="sm" c="dimmed" lineClamp={4} mt={4}>
        {data.quote}
      </Text>
      <div style={{marginTop:'5px'}}>
        <Text fz="md" inline>
            {data.user.fullName}
        </Text>
        <div style={{marginTop:'5px'}}>
            
            <Text fz="sm" inline>
                {data?.position? data.position : data.user.professionalInfo.workplacePosition}
            </Text>
            <Text fz="sm" inline>
                {data?.organization? data.organization : data.user.professionalInfo.workplaceName}
            </Text>
        </div>
      </div>
    </Card>
  );
}