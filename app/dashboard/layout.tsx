"use client"
import { useState } from 'react';
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
} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './DashboardLayout.module.css';
import { useRouter } from 'next/navigation';

const data = [
  { link: '', label: 'Profile', icon: IconBellRinging, access:'USER' },
  { link: '', label: 'Billing', icon: IconReceipt2, access:'USER'},
  { link: '', label: 'Security', icon: IconFingerprint, access:'USER'},
  { link: '', label: 'SSH Keys', icon: IconKey },
  { link: 'users', label: 'Users', icon: IconUsersGroup, access:'ADMIN' },
  { link: '', label: 'Authentication', icon: Icon2fa },
  { link: '', label: 'Other Settings', icon: IconSettings },
];

export default function NavbarSimple({children}:{children:any}) {
  const [active, setActive] = useState('Billing');
  const router = useRouter()

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        router.push(item.link);
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <div style={{display:'flex'}}>
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                {links}
            </div>

            <div className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
                <span>Change account</span>
                </a>

                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                <IconLogout className={classes.linkIcon} stroke={1.5} />
                <span>Logout</span>
                </a>
            </div>
        </nav>
        <div style={{width:'100%'}}>
            {children}
        </div>
    </div>
  );
}