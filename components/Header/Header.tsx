'use client';

import {
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    rem,
    useMantineTheme,
    Table,
  } from '@mantine/core';
  import { MantineLogo } from '@mantinex/mantine-logo';
  import { useDisclosure } from '@mantine/hooks';
  import {
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
    IconChevronDown,
    IconLogout,
  } from '@tabler/icons-react';
  import classes from './Header.module.css';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGetCommitteeListQuery } from '@/lib/redux/features/committee/committeeApi';
import useAuth from '@/hooks/useAuth';
import { UserMenu } from '../UserMenu/UserMenu';
import { useDispatch, useSelector } from 'react-redux';

  const mockdata = [
    {
      icon: IconCode,
      title: 'Running',
      description: 'Formed in 18 July 2023',
    },
    {
      icon: IconCoin,
      title: 'Founding',
      description: 'Founded in 12 July 2015',
    },
    {
      icon: IconBook,
      title: 'Former',
      description: 'Total 12 Committees',
    },
  ];



export function Header() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const {data,isLoading} = useGetCommitteeListQuery('arg')
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const theme = useMantineTheme();
    const dispatch = useDispatch()
    const links = mockdata.map((item) => (
      <UnstyledButton className={classes.subLink} key={item.title}>
        <Group wrap="nowrap" align="flex-start">
          <ThemeIcon size={34} variant="default" radius="md">
            <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
          </ThemeIcon>
          <div>
            <Text size="sm" fw={500}>
              {item.title}
            </Text>
            <Text size="xs" c="dimmed">
              {item.description}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    )
  );

  const auth = useAuth();
  const {user} = useSelector((state:any)=>state.auth);
  console.log(user)

  const router = useRouter()
    
  const onHandleClick = (button:string)=>{
    if(button === 'login'){
        router.push('/login')
    }else if(button === 'signup'){
        router.push('/register')
    }
  }



    return (
      <Box pb={120}>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            <MantineLogo size={30} />
            <Group h="100%" gap={0} visibleFrom="sm">
              <Link href="/" className={classes.link}>
                Home
              </Link>
              <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                <HoverCard.Target>
                  <a href="#" className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5}>
                        Committee
                      </Box>
                      <IconChevronDown
                        style={{ width: rem(16), height: rem(16) }}
                        color={theme.colors.blue[6]}
                      />
                    </Center>
                  </a>
                </HoverCard.Target>
                <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                  <Group justify="space-between" px="md">
                    <Text fw={500}>Features</Text>
                    <Anchor href="#" fz="xs">
                      View all
                    </Anchor>
                  </Group>
                  <Divider my="sm" />

                  <SimpleGrid cols={3} spacing={0}>
                    {links}
                  </SimpleGrid>

                  <div className={classes.dropdownFooter}>
                    <div>
                      {
                        data?.committee?.map((item:any)=>{
                          return <div key={item?._id}>
                            <Text size="sm" fw={500}>
                              {item?.name}
                            </Text>
                          </div>
                        })
                      }
                    </div>
                  </div>
                </HoverCard.Dropdown>
              </HoverCard>
              <a href="#" className={classes.link}>
                Members
              </a>
              <a href="#" className={classes.link}>
                Blogs
              </a>
              <a href="#" className={classes.link}>
                About Us
              </a>
              <Link href="/contact" className={classes.link}>
                Contact
              </Link>
            </Group>

            <Group visibleFrom="sm">
              <ThemeSwitch />
              {
                auth? (
                  <div style={{display:'flex',gap:'5px',alignItems:'center'}}>
                     <UserMenu user={user}/>
                  </div>
                  
                )
                :
                <div>
                    <Button variant="default" me="sm" onClick={()=>onHandleClick('login')}>
                      Log in
                    </Button>
                    <Button onClick={()=>onHandleClick('signup')}>Sign up</Button>
                  </div>
              }
            </Group>

            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
          </Group>
        </header>

        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
            <Divider my="sm" />

            <a href="#" className={classes.link}>
              Home
            </a>
            <UnstyledButton className={classes.link} onClick={toggleLinks}>
              <Center inline>
                <Box component="span" mr={5}>
                  Features
                </Box>
                <IconChevronDown
                  style={{ width: rem(16), height: rem(16) }}
                  color={theme.colors.blue[6]}
                />
              </Center>
            </UnstyledButton>
            <Collapse in={linksOpened}>{links}</Collapse>
            <a href="#" className={classes.link}>
              Learn
            </a>
            <a href="#" className={classes.link}>
              Academy
            </a>
            <Divider my="sm" />
            <Group justify="center" grow pb="xl" px="md">
              <ThemeSwitch />
              <Button variant="default" onClick={()=>onHandleClick('login')}>Log in</Button>
              <Button onClick={()=>onHandleClick('signup')}>Sign up</Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
    );
}
