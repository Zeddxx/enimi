import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface Request {
            userId: string
        }
    }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['enimi_auth'];

    if(!token) {
        return res.status(403).json({ message: "Access Denied!" })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET as string)
        
        req.userId = (decode as JwtPayload).userId;

        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: "Access Denied!" }) 
    }
}