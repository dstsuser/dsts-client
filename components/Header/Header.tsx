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
    Image,
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
import { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.png'
import NextImage from 'next/image';


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
    const [isSticky, setSticky] = useState(false);

    console.log(data)


    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 750) {
          setSticky(true);
        } else {
          setSticky(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const handleNavigateToCommittee = (item:any)=>{
      console.log('slug',item)
      router.push(`/committees/${item.slug}`)
    }

    function capitalizeFirstLetter(str:string) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const links = data?.committee?.map((item:any) => (
      <UnstyledButton mb={'xs'} onClick={()=>handleNavigateToCommittee(item)} className={classes.subLink} key={item.title}>
        <Group wrap="nowrap" align="flex-start">
          <div>
            <Text size="sm" fw={500}>
              {`${capitalizeFirstLetter(item?.type)} Committee`}
            </Text>
            <Text size="xs" c="dimmed">
              {item.formingDate}
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
      <Box className={isSticky ? classes.sticky : ''}>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            <div>
              <Link href="/" style={{textDecoration:'none'}}>
                <Image component={NextImage} style={{height:'50px',width:'50px'}} height={1000} width={1000} src={logo} alt="dsts logo" />
              </Link>
            </div>
            <Group h="100%" gap={0} visibleFrom="sm">
              <Link href="/" className={classes.link} >
                Home
              </Link>
              <HoverCard  position="bottom" radius="md" shadow="md" withinPortal>
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
                  {/* <Group justify="space-between" px="md">
                    <Text fw={500}>Features</Text>
                    <Anchor href="#" fz="xs">
                      View all
                    </Anchor>
                  </Group> */}
                  {/* <Divider my="sm" /> */}

                  <SimpleGrid cols={1} spacing={0}>
                    {links}
                  </SimpleGrid>

                  {/* <div className={classes.dropdownFooter}>
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
                  </div> */}
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
                     {/* <UserMenu user={user}/> */}
                     <Button variant="default" me="sm" onClick={()=>router.push('/dashboard')}>
                      Dashboard
                    </Button>
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
