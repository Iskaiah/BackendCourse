import 'dotenv/config'; 

import express from 'express';
import { connectDB, disconnectDB } from './config/db.js';

// Import Routes
import movieRoutes from './routes/movieRoutes.js';
import authRoutes from './routes/authRoutes.js';

connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;

// Capture server instance
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    server.close(async () => { // server is now defined
        await disconnectDB();
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exception:", err);
    await disconnectDB();
    process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully...");
    server.close(async () => { //  server is now defined
        await disconnectDB();
        console.log("Server closed, database disconnected. Exiting process.");
        process.exit(0);
    });
});