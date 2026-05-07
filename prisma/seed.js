import 'dotenv/config'; // First

import { prisma, disconnectDB } from '../config/db.js'; // ✅ Use configured instance

const userId = "78f167a5-2cda-4ae8-93af-2cf247fd32f2";

const movies = [
    {
        title: "The Matrix",
        overview: "A computer hacker learns about the true nature of reality",
        releaseYear: 1999,
        genre: "Action, Sci-Fi",
        runtime: 136,
        posterUrl: "https://example.com/matrix.jpg",
        createdBy: userId,
    }
];

const main = async () => {
    console.log("Seeding database...");

    for (const movie of movies) {
        await prisma.movie.create({
            data: movie,
        });
        console.log(`Created movie: ${movie.title}`);
    }

    console.log("Seeding completed.");
};

main()
    .catch((err) => {
        console.error("❌ Seeding failed:", err);
        process.exit(1);
    })
    .finally(async () => {
        await disconnectDB(); // Closes both prisma and the pg pool
    });