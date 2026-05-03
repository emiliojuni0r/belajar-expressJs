import { prisma } from '../config/db.js'

const addTowatchList = async (req, res) => {
    const { movieId, status, rating, notes, userId } = req.body

    // verify movie
    const movie = await prisma.movie.findUnique({
        where: { id: movieId }
    });

    if (!movie) {
        return res.status(404).json({
            error: "movie not found"
        })
    }

    // check if already added
    const existingInWatchList = await prisma.watchlistItem.findUnique({
        where: {
            userId_movieId:
            {
                userId: userId,
                movieId: movieId
            }
        }
    })

    if (existingInWatchList) {
        return res.status(404).json({
            error: "movie already in the watchlist"
        })
    }

    const watchlistItem = await prisma.watchlistItem.create({
        data: {
            userId,
            movieId,
            status: status || "PLANNED",
            rating,
            notes
        }
    })

    res.status(201).json({
        status: "success",
        data: {
            watchlistItem
        }
    })
}

export { addTowatchList };