import AppError from "../../domain/utils/AppError"
import jwt from 'jsonwebtoken'
import Strings from "../utils/Strings"

export default async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json(new AppError(401, 'INVALID_TOKEN', 'Token not found'))
    }

    const [, token] = authHeader.split(' ')


    try {
        await jwt.verify(token, Strings.jwt_key)
    } catch (error) {
        return res.status(401).json(new AppError(401, 'INVALID_TOKEN', 'Please, provide a valid token'))
    }

    return next()
}