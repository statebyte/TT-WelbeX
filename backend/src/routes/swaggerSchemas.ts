/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         content:
 *           type: string
 *         mediaUrl:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         author:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *             login:
 *               type: string
 *
 *     CreatePostInput:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         content:
 *           type: string
 *         mediaUrl:
 *           type: string
 *     UpdatePostInput:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         content:
 *           type: string
 *         mediaUrl:
 *           type: string
 */

