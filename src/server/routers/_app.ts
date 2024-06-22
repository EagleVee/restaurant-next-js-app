import { router } from '@/server/trpc';
import { restaurantRouter } from '@/server/routers/restaurantRouter';

export const appRouter = router({
    restaurants: restaurantRouter,
});

export type AppRouter = typeof appRouter;
