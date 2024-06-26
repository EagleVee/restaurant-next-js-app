import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { navigationBarItems } from '@/components/Navigation/navigationConfig';

const NavigationBar = () => {
    const router = useRouter();

    const getIsActive = (pathname: string) => router.asPath === pathname;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-t-gray-200">
            <div className="flex justify-between items-center pt-1 pb-2">
                <div className="flex flex-grow justify-evenly">
                    {navigationBarItems.map((item) => {
                        const { Icon, href, label } = item;
                        const isActive = getIsActive(href);
                        return (
                            <Link
                                key={href}
                                href={href}
                                aria-label={label}
                                className={`px-4 icon-button ${isActive ? 'text-tint-color' : 'text-gray-600'} flex flex-col items-center`}>
                                <Icon />
                                <div className="text-xs mt-0.5">{label}</div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default NavigationBar;
