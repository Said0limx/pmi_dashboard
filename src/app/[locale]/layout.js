import '@mantine/core/styles.css';
import './globals.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Open_Sans } from 'next/font/google';
import { getMessages } from 'next-intl/server';

import IntlProvider from '@/providers/intl-provider';
// import NetworkStatusProvider from '@/providers/network-status-provider';
import QueryClientProvider from '@/providers/query-client-provider';
import ToastProvider from '@/providers/toast-provider';
import { TailwindIndicator } from '@/shared/ui';
import { RouterTransition } from '@/shared/ui/router-transition';
const openSans = Open_Sans({ subsets: ['latin', 'cyrillic'] });

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel='shortcut icon' href='/favicon.ico' />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
      </head>
      <body className={openSans.className}>
        <ToastProvider>
          <RouterTransition />
          <MantineProvider defaultColorScheme='dark'>
            <QueryClientProvider>
              <IntlProvider locale={locale}>{children}</IntlProvider>
            </QueryClientProvider>
            <TailwindIndicator />
          </MantineProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
