import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Custom404() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <Link href="/" className="text-xl text-gray-900 underline">
                Home
            </Link>
            <div className="flex flex-col">
                <h1 className="text-9xl font-bold text-gray-900">404</h1>
                <h2 className="text-4xl font-bold text-gray-900">This page is not yet ready</h2>
            </div>
        </div>
    );
}
