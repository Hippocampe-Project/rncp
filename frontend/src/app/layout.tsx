'use client';

import { ApolloProvider } from '@apollo/client';
import * as React from 'react';

import '@/styles/globals.css';

import { client } from '@/lib/apolloClient';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

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
