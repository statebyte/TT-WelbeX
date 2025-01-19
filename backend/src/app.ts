import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import 'reflect-metadata';
import { RouteUse } from './routes/routes';

const app = express()
app.use(cors())
app.use(bodyParser.json())

RouteUse(app)

export { app }
