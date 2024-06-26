import { Prisma, PrismaClient } from '@prisma/client';
import { procedure, router } from '@/server/trpc';
import { z } from 'zod';
import { STORE_CATEGORY } from '@/types/restaurant';

const prisma = new PrismaClient();

export const restaurantRouter = router({
    getRestaurants: procedure
        .input(
            z
                .object({
                    cursor: z.number().min(0).default(0),
                    queryString: z.string().optional(),
                    category: z.nativeEnum(STORE_CATEGORY).optional(),
                    take: z.number().optional(),
                    sortBy: z.string().optional(),
                    sortOrder: z.enum(['asc', 'desc']).optional(),
                })
                .optional()
        )
        .query(async ({ input }) => {
            const { queryString, category, sortBy = 'id', sortOrder = 'asc', take = 12, cursor = 0 } = input || {};
            const where: Prisma.RestaurantWhereInput = {};

            if (queryString) {
                where.name = { contains: queryString, mode: 'insensitive' };
            }

            if (category) {
                where.category = category;
            }

            const items = await prisma.restaurant.findMany({
                skip: cursor * take,
                take: take + 1,
                where,
                orderBy: {
                    [sortBy]: sortOrder,
                },
            });

            const hasMore = items.length > take;
            const restaurants = items.slice(0, take);
            const nextCursor = hasMore ? cursor + 1 : undefined;

            return { restaurants, hasMore, nextCursor };
        }),
    toggleFavorite: procedure
        .input(z.object({ id: z.string(), isFavorite: z.boolean() }))
        .mutation(async ({ input }) => {
            const { id, isFavorite } = input;
            return prisma.restaurant.update({
                where: { id },
                data: { isFavorite },
            });
        }),
});
