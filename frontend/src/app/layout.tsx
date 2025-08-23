'use client';

import '@/styles/globals.css';

import * as React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/apolloClient';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='flex flex-col min-h-screen'>
          <ApolloProvider client={client}>
            <Header />
            <main className='flex-grow'>{children}</main>
            <Footer />
          </ApolloProvider>

      </body>
    </html>
  );
}
