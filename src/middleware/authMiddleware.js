import jwt from 'jsonwebtoken'
import { prisma } from '../config/db.js';
import "dotenv/config";


// read the token from request
// check if token is valid
export const authMiddleware = async (req, res, next) => {
    console.log("auth Middleware reached")

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1] // ["Bearer", "adwhjkakdhbkw"]
    } else if (req.cookies?.jwt) {
        token = req.cookies.jwt
    }

    if (!token) {
        return res.status(401).json({ error: "Not authorized, no token provided" })
    }

    console.log("TOKEN:", token)
    console.log('req.headers.authorization :',req.headers.authorization)

    // verify token and extract the user Id
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        })

        if (!user) {
            return res.status(401).json({ error: "User no longer exist" })
        }

        req.user = user
        next()

    } catch (err) {
        return res.status(401).json({ error: "Not authoreized, token failed" })
    }
}