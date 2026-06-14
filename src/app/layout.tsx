'use client';

import { ThemeProvider } from 'styled-components';
import Theme from '@/theme/theme-variables';
import GlobalStyles from '@/theme/global-style';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import StyledComponentsRegistry from './registry';
import QueryProvider from '@/providers/QueryProvider';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

import './globals.css';
import { usePathname } from 'next/navigation';
import { AUTH_ROUTES } from '@/constants';
import { store } from '@/store';
import ProtectedRoute from '@/components/ProtectedRoutes';

export default function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <Provider store={store}>
            <QueryProvider>
              <ProtectedRoute>
                <ThemeProvider theme={Theme}>
                  <GlobalStyles />
                  {!AUTH_ROUTES.some(route => pathName.includes(route)) ? (
                    <div className="flex">
                      <Sidebar />
                      <div className="w-full">
                        <Navbar />
                        <div className="p-8 pb-6 h-[calc(100vh-80px)] overflow-y-auto">{children}</div>
                      </div>
                    </div>
                  ) : (
                    <div>{children}</div>
                  )}
                </ThemeProvider>
              </ProtectedRoute>
            </QueryProvider>
          </Provider>
        </StyledComponentsRegistry>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
