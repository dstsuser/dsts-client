import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../theme';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import AuthChecker from './authChecker';
import { Providers } from '@/lib/provider';
import { Notifications } from '@mantine/notifications';
import './global.css';

export const metadata = {
  title: 'DSTS Association',
  description: `Established in 1995 by A.K.M Jahangir at Dhaka University, the Dhakasto Sakhipur Thana Students Association (DSTS) unites students from Sakhipur Thana, Tangail District. Dedicated to empowering youth, DSTS provides guidance for university admissions and fosters leadership qualities. Our initiatives include community events, social engagement, scholarships, and cultural celebrations, enriching education while honoring Sakhipur's heritage. Committed to student growth and community development, DSTS continues to shape a brighter future for Sakhipur and its residents.`,
  keywords:['dsts association','sakhipur thana','students association bangladesh','tangail district']
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/logo.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Notifications />
          <Providers>
          <AuthChecker>
            {children}
          </AuthChecker>
          </Providers>
        </MantineProvider>
      </body>
    </html>
  );
}
