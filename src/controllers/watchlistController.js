import { prisma } from '../config/db.js'

const addTowatchList = async (req, res) => {
    const { movieId, status, rating, notes } = req.body

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
                userId: req.user.id,
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
            userId: req.user.id,
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

const updateWatchliStItem = async (req, res) => {
    const { status, rating, notes } = req.body;

    // find watchlist item and verify ownership
    const watchlistItem = await prisma.watchlistItem.findUnique({
        where: { id: req.params.id }
    })

    if (!watchlistItem) {
        return res.status(404).json({ error: "watchlist item not found" });
    }

    // ensure only owner can update
    if (watchlistItem.userId !== req.user.id) {
        return res.status(403).json({ error: "Not allowed to update this watchlist item" })
    }

    // Build update data
    const updateData = {};
    if (status !== undefined) updateData.status = status.toUpperCase();
    if (rating !== undefined) updateData.rating = rating;
    if (notes !== undefined) updateData.notes = notes;

    // Update watchlist item
    const updatedItem = await prisma.watchlistItem.update({
        where: { id: req.params.id },
        data: updateData,
    });

    res.status(200).json({
        status: "success",
        data: {
            watchlistItem: updatedItem,
        },
    });
}


const removeFromWatchList = async (req, res) => {
    // find watchlist item and verifyt ownership
    const watchlistItem = await prisma.watchlistItem.findUnique({
        where: { id: req.params.id }
    })

    if (!watchlistItem) {
        return res.status(404).json({ error: "watchlist item not found" });
    }

    // ensure only owner can delete
    if (watchlistItem.userId !== req.user.id) {
        return res.status(403).json({ error: "Not allowed to update this watchlist item" })
    }

    await prisma.watchlistItem.delete({
        where: { id: req.params.id }
    })

    res.status(200).json({
        status: "success",
        message: "movie removed from watchlist",

    })
}

export { addTowatchList, removeFromWatchList, updateWatchliStItem };