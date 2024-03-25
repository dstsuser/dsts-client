'use client';

import React from 'react';
import { Switch, useMantineTheme, rem, useMantineColorScheme, MantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

export default function ThemeSwitch() {
    const theme = useMantineTheme();
    const { setColorScheme } = useMantineColorScheme();
    const [activeColor, setActiveColor] = React.useState<MantineColorScheme>('light');

    const handleColorScheme = (color: MantineColorScheme) => {
            setActiveColor(color);
            setColorScheme(color);
    };

    const sunIcon = (
        <IconSun
          style={{ width: rem(16), height: rem(16) }}
          stroke={2.5}
          color={theme.colors.blue[6]}
        />
      );
      const moonIcon = (
        <IconMoonStars
          style={{ width: rem(16), height: rem(16) }}
          stroke={2.5}
          color={theme.colors.blue[6]}
        />
      );
  return <Switch onClick={() => handleColorScheme(activeColor === 'light' ? 'dark' : 'light')} size="md" color="dark" onLabel={sunIcon} offLabel={moonIcon} />;
}
