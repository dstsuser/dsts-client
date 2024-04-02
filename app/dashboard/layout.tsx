"use client"
import { useEffect, useState } from 'react';
import { Group, Code } from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconUsersGroup,
  IconLogout,
  IconUserPlus,
  IconUserCode,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './DashboardLayout.module.css';
import { useRouter,usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { userLoggedOut } from '@/lib/redux/features/auth/authSlice';
import useAuth from '@/hooks/useAuth';
import { Header } from '@/components/Header/Header';
const data = [
  // { link: '', label: 'Profile', icon: IconBellRinging, access:'USER' },
  // { link: '', label: 'Billing', icon: IconReceipt2, access:'USER'},
  // { link: '', label: 'Security', icon: IconFingerprint, access:'USER'},
  // { link: '', label: 'SSH Keys', icon: IconKey },
  { link: '/dashboard/users', label: 'Users', icon: IconUsersGroup, access:'ADMIN' },
  { link: '/dashboard/committees', label: 'Committees', icon: IconUsersGroup },
  { link: '/dashboard/positions', label: 'Positions', icon: IconUserCode },
];

export default function NavbarSimple({children}:{children:any}) {
  const [active, setActive] = useState('');
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useDispatch()
  const auth = useAuth()

  useEffect(()=>{
    if(!auth){
      router.push('/login')
    }
  },[auth])

  useEffect(()=>{
    const path = pathname.split('/')[2]
    console.log(path)
    setActive(path)
  },[pathname])

  const handleLogout = (e:any) => {
    e.preventDefault()
    dispatch(userLoggedOut())
  }

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item?.label?.toLocaleLowerCase() === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        router.push(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <div className={classes.wrapper}>
      <Header/>
      <div style={{display:'flex',height:'92vh'}} >
          <nav className={classes.navbar}>
              <div className={classes.navbarMain}>
                  {links}
              </div>

              <div className={classes.footer}>
                  <a style={{cursor:'pointer'}} className={classes.link} onClick={(e) =>handleLogout(e)}>
                  <IconLogout className={classes.linkIcon} stroke={1.5} />
                  <span>Logout</span>
                  </a>
              </div>
          </nav>
          <div style={{width:'100%',overflowY:'auto'}}>
              {children}
          </div>
      </div>
    
    </div>
  );
}