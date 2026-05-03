import { prisma } from "../config/db.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js";


const register = async (req, res) => {
    const body = req.body;
    const { name, email, password } = req.body;

    // check if user 
    const userExist = await prisma.user.findUnique({
        where: { email: email }
    })

    if (userExist) {
        return res.status(400).json({
            error: "User Already exist with this email"
        })
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    // Generate JWT Token
    const token = generateToken(user.id, res);

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: name,
                email: email
            },
            token
        }
    })
}

const login = async (req, res) => {
    const { email, password } = req.body

    // chcek if email exist in the table
    const user = await prisma.user.findUnique({
        where: { email: email }
    })

    if (!user) {
        return res
            .status(400)
            .json({ error: "invalid email" })
    }

    // verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res
            .status(401)
            .json({ error: "invalid password" })
    }

    // Generate JWT Token
    const token = generateToken(user.id, res);

    res.status(201).json({
        status: "successfully logged in",
        data: {
            user: {
                id: user.id,
                email: email
            },
            token
        }
    })

}

const logout = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({
        statusL: "success",
        message: "Logged out successfully"
    })
}

export { register, login, logout }