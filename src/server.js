import express from "express";
import { config } from "dotenv";

// Import routes
import movieRoutes from "./routes/movieRoutes.js";

config();

const app = express();

// API Routes

app.use("/movies", movieRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log('Server is running on PORT ${PORT}');
});

// GET, POST, PUT, DELETE
// http://localhost:5001/hello