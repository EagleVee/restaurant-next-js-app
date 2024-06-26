import Head from 'next/head';
import type { ReactNode } from 'react';

import { Inter } from 'next/font/google';
import NavigationBar from '@/components/Navigation/NavigationBar';

type DefaultLayoutProps = { children: ReactNode };

const inter = Inter({ subsets: ['latin'] });

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    return (
        <>
            <Head>
                <title>Restaurant App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={`${inter.className} pb-16`}>{children}</main>
            <NavigationBar />
        </>
    );
};
