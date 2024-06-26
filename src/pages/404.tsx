import Link from 'next/link';

export default function Custom404() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <Link href="/" className="text-gray-900 underline">
                Home
            </Link>
            <div className="flex flex-col">
                <h1 className="text-9xl font-bold text-gray-900">404</h1>
                <h2 className="text-4xl font-bold text-gray-900">Page not found</h2>
            </div>
        </div>
    );
}
