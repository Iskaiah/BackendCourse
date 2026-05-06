import express from 'express';
import { config } from 'dotenv';
import { connectDB, disconnectDB } from './config/db.js';

// Import Routes
import movieRoutes from './routes/movieRoutes.js';

config(); 

connectDB();

const app = express();

// API Routes
app.use('/movies', movieRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    server.close( async () => {
        await disconnectDB();
        process.exit(1);
    });
});

// handle uncaught exceptions
process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exception:", err);
    await disconnectDB();
    process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully...");
    server.close( async () => {
        await disconnectDB();
        console.log("Server closed, database disconnected. Exiting process.");
        process.exit(0);
    });
});