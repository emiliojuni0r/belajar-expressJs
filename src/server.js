import express from 'express';
import { config } from "dotenv";
import { connectDB, disconnectDB } from './config/db.js';

// import Routes
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import watchListRoutes from "./routes/watchListRoutes.js";

config();
connectDB();

const app = express();

// Body Parsing Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// API routes
app.use("/movies", movieRoutes)
app.use("/auth", authRoutes)
app.use("/watchlist", watchListRoutes)

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

// handle unhandled promise rejections (e.g database connection errors)
process.on("unhandledRejection", (err) => {
    console.error("unhandled Rejection:", err);
    server.closer(async () => {
        await disconnectDB();
        process.exit(1)
    })
})

// handle uncaught exceptions
process.on("uncaughtException", async (err) => {
    console.error("uncaught Exception:", err);
    await disconnectDB();
    process.exit(1)
})

// graceful shutdown
process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully");
    server.close(async () => {
        await disconnectDB();
        process.exit(0)
    })
})

// GET, POST, PUT, DELETE

// https://localhost:5001/

// AUTH - signin,signup
// MOVIE - getting all movies
// USER - profile
// WATCHLIST