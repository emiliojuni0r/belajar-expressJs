import express from 'express'
import { addTowatchList, removeFromWatchList, updateWatchliStItem } from '../controllers/watchlistController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { addTowatchListSchema } from '../validator/watchlistValidator.js';

const router = express.Router();

router.use(authMiddleware)

router.post("/", validateRequest(addTowatchListSchema), addTowatchList)
// router.post("/", authMiddleware,addTowatchList)

// {{ baseUrl }}/watchlist/:id
router.put("/:id", updateWatchliStItem)

router.delete("/:id", removeFromWatchList)

export default router;