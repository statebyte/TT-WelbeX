import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { User } from '../entity/User'
import { SignJWT } from 'jose'
import * as bcrypt from 'bcrypt'

export async function register(req: Request, res: Response): Promise<void> {
    const { login, password } = req.body

    const userRepo = AppDataSource.getRepository(User)
    const existing = await userRepo.findOneBy({ login })

    if (existing) {
        res.status(400).json({ message: 'User exists' })
        return
    }
    
    const hash = await bcrypt.hash(password, 10)
    const user = userRepo.create({ login, password: hash })
    await userRepo.save(user)

    res.json({ message: 'Registered' })
}

export async function login(req: Request, res: Response): Promise < void> {
    const { login, password } = req.body
    const userRepo = AppDataSource.getRepository(User)

    const user = await userRepo.findOneBy({ login })
    if (!user) {
        res.status(400).json({ message: 'Invalid creds' })
        return 
    }
    
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
        res.status(400).json({ message: 'Invalid creds' })
        return
    }
    
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'secret')
    
    const token = await new SignJWT({ id: user.id })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('2h')
        .sign(secret)
    
    res.json({ token, login: user.login })
}
