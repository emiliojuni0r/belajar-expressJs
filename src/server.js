import express from 'express'

// import Routes
import movieRoutes from "./routes/movieRoutes.js"

const app = express();

// API routes
app.use("/movies", movieRoutes)
const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

// GET, POST, PUT, DELETE

// https://localhost:5001/

// AUTH - signin,signup
// MOVIE - getting all movies
// USER - profile
// WATCHLIST