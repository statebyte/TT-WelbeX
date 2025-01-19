import { Router } from 'express'
import { createPost, getPosts, updatePost, deletePost } from '../controllers/postController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = Router()
/**
 * @openapi
 * /api/posts:
 *   get:
 *     summary: Получить все посты
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: Список постов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get('/', getPosts)
/**
 * @openapi
 * /api/posts:
 *   post:
 *     summary: Создать пост
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePostInput'
 *     responses:
 *       200:
 *         description: Возвращает созданный пост
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.post('/', authMiddleware, createPost)
router.put('/:id', authMiddleware, updatePost)
router.delete('/:id', authMiddleware, deletePost)

export default router