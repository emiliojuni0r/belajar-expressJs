import jwt from 'jsonwebtoken'
import { prisma } from '../config/db.js';


// read the token from request
// check if token is valid
export const authMiddleware = async () => {
    console.log("auth Middleware reached ")


}