import { NextFunction, Request, Response } from 'express'
import { jwtVerify } from 'jose'

export async function authMiddleware(req: Request, res: Response, next: NextFunction):Promise<void> {
    const header = req.headers.authorization
    if (!header) {
        res.status(401).json({ message: 'Unauthorized' })
        return
    }
    
    const token = header.split(' ')[1]
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'secret')
        const { payload } = await jwtVerify(token, secret)
        // eslint-disable-next-line
        //@ts-ignore
        req.user = payload
        next()
    } catch (e) {
        res.status(401).json({ message: 'Invalid token'})
    }
}
