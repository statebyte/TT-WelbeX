import { Application } from 'express';
import authRoutes from '../routes/auth'
import postRoutes from '../routes/posts'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from '../swagger'

export const RouteUse = (app: Application):void => {
    app.use('/api/auth', authRoutes)
    app.use('/api/posts', postRoutes)
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}