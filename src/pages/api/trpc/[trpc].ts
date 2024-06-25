import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '@/server/routers/_app';
import { NextRequest } from 'next/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

// I tried but haven't found a way use edge handle without Vercel in local environment

// export const config = {
//     runtime: 'edge',
// };

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

export default trpcHandler;
