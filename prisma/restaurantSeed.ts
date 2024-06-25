import { PrismaClient } from '@prisma/client';
import restaurants from './restaurants.json';
const prisma = new PrismaClient();

async function main() {
    for (const restaurant of restaurants) {
        await prisma.restaurant.upsert({
            where: {
                id: restaurant.id || '',
            },
            update: restaurant,
            create: restaurant,
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
