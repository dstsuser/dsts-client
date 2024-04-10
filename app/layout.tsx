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
  description: 'I am using Mantine with Next.js!',
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
