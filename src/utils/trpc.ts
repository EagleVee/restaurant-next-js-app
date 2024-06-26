import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '@/server/routers/_app';
import superjson from 'superjson';

console.log('VERCEL URL', process.env.NEXT_PUBLIC_VERCEL_URL);

function getBaseUrl() {
    if (typeof window !== 'undefined') return '';

    if (process.env.NEXT_PUBLIC_VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

    return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
    config(opts) {
        return {
            transformer: superjson,
            links: [
                httpBatchLink({
                    url: `${getBaseUrl()}/api/trpc`,
                    async headers() {
                        return {};
                    },
                }),
            ],
        };
    },
    ssr: true,
});
