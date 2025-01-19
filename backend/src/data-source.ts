import { DataSource } from 'typeorm'
import { User } from './entity/User'
import { Post } from './entity/Post'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'db',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'blog_db',
    synchronize: true,
    logging: false,
    entities: [User, Post]
})