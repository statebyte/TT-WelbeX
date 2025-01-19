import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Post } from '../entity/Post'
import { User } from '../entity/User'

export async function createPost(req: Request, res: Response): Promise<void> {
    const { content, mediaUrl } = req.body

    const userRepo = AppDataSource.getRepository(User)
    // eslint-disable-next-line
    //@ts-ignore
    const userId = req.user.id
    const user = await userRepo.findOneBy({ id: userId })
    if (!user) {
        res.status(404).json({ message: 'User not found' })
        return;
    }
    const postRepo = AppDataSource.getRepository(Post)
    const post = postRepo.create({
        content,
        mediaUrl,
        createdAt: new Date(),
        author: user
    })

    await postRepo.save(post)
    res.json(post)
}

export async function getPosts(req: Request, res: Response): Promise<void> {
    const postRepo = AppDataSource.getRepository(Post)
    const posts = await postRepo.find({ relations: ['author'] })
    res.json(posts)
}

export async function updatePost(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    const { content, mediaUrl } = req.body

    const postRepo = AppDataSource.getRepository(Post)
    const post = await postRepo.findOne({
        where: { id: parseInt(id, 10) },
        relations: ['author']
    })
    if (!post) {
        res.status(404).json({ message: 'Not found' })
        return;
    }
    // eslint-disable-next-line
    //@ts-ignore
    if (post.author.id !== req.user.id) return res.status(403).json({ message: 'Forbidden' })

    post.content = content
    post.mediaUrl = mediaUrl
    await postRepo.save(post)
    res.json(post)
}

export async function deletePost(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    const postRepo = AppDataSource.getRepository(Post)
    const post = await postRepo.findOne({
        where: { id: parseInt(id, 10) },
        relations: ['author']
    })
    if (!post) {
        res.status(404).json({ message: 'Not found' })
        return;
    }

    // eslint-disable-next-line
    //@ts-ignore
    if (post.author.id !== req.user.id) return res.status(403).json({ message: 'Forbidden' })

    await postRepo.remove(post)
    res.json({ message: 'Deleted' })
}