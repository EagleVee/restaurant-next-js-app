import { PrismaClient } from '@prisma/client';
import { procedure, router } from '@/server/trpc';
import { z } from 'zod';
import { Restaurant } from '@/types/restaurant';

const prisma = new PrismaClient();

export const restaurantRouter = router({
    getRestaurants: procedure.query(async (): Promise<Restaurant[]> => {
        return prisma.restaurant.findMany();
    }),
    toggleFavorite: procedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
        const restaurant = await prisma.restaurant.findUnique({
            where: { id: input.id },
        });
        return prisma.restaurant.update({
            where: { id: input.id },
            data: { isFavorite: !restaurant?.isFavorite },
        });
    }),
});
