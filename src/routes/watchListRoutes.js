import express from 'express'
import { addTowatchList } from '../controllers/watchlistController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware)

router.post("/", addTowatchList)

export default router;