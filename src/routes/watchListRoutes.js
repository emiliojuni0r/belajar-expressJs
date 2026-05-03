import express from 'express'
import { addTowatchList } from '../controllers/watchlistController.js';

const router = express.Router();

router.post("/", addTowatchList)

export default router;