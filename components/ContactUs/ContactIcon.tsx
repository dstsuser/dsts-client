import { Text, Box, Stack, rem } from '@mantine/core';
import { IconSun, IconPhone, IconMapPin, IconAt } from '@tabler/icons-react';
import classes from './ContactIcon.module.css';
import { useGetSettingInfoQuery } from '@/lib/redux/features/setting/settingApi';

interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  icon: typeof IconSun;
  name: React.ReactNode;
  value: React.ReactNode;
}

function ContactIcon({ icon: Icon, name, value, ...others }: ContactIconProps) {
  // console.log(Icon)
  return (
    <div className={classes.wrapper} {...others}>
      <Box mr="md">
        <Icon style={{ width: rem(24), height: rem(24) }} />
      </Box>

      <div>
        <Text size="xs" className={classes.title}>
          {name}
        </Text>
        <Text className={classes.description}>{value}</Text>
      </div>
    </div>
  );
}

export function ContactIconsList({data}:{data:any}) {



  const convertDataToContactIcon = (data:any) => {
    return data.map((item:any) => {
      return {
        name: item.name,
        value: item.value,
        icon: item?.icon==='IconAt'?IconAt:item?.icon==='IconPhone'?IconPhone:item?.icon==='IconMapPin'?IconMapPin:IconSun
      }
    })
  }

  let itemForContactIcon = data ? convertDataToContactIcon(data) : data;


  const items = itemForContactIcon?.map((item:any, index:any) => <ContactIcon key={index} {...item} />);
  return <Stack>{items}</Stack>;
}