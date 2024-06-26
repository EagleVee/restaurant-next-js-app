import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '@/server/routers/_app';
import { NextRequest } from 'next/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const isVercelEnvironment = !!process.env.NEXT_PUBLIC_VERCEL_URL?.length;

export const config = {
    runtime: isVercelEnvironment ? 'edge' : 'nodejs',
};

const edgeHandler = async (req: NextRequest) => {
    return fetchRequestHandler({
        endpoint: '/api/trpc',
        router: appRouter,
        req,
        createContext: () => ({}),
    });
};

const trpcHandler = trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: () => ({}),
});

export default isVercelEnvironment ? edgeHandler : trpcHandler;
