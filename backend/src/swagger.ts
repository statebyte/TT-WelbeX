import swaggerJSDoc from 'swagger-jsdoc'
import { version } from '../package.json'

export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Blog API',
            version
        },
        servers: [
            {
                url: '/api'
            }
        ]
    },
    apis: ['./src/routes/*.ts', './dist/routes/*.js']
})