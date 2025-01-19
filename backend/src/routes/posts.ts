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

/**
 * @openapi
 * /api/posts/{id}:
 *   put:
 *     summary: Обновление поста
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID поста
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePostInput'
 *     responses:
 *       200:
 *         description: Возвращает обновленный пост
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.put('/:id', authMiddleware, updatePost)

/**
 * @openapi
 * /api/posts/{id}:
 *   delete:
 *     summary: Удаление поста
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID поста
 *     responses:
 *       200:
 *         description: Возвращает сообщение об успешном удалении
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Пост успешно удален
 */
router.delete('/:id', authMiddleware, deletePost)

export default router