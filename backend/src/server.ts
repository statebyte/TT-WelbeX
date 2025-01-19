import 'reflect-metadata'
import { app } from './app'
import { AppDataSource } from './data-source'
import { version } from '../package.json'

const port = process.env.PORT || 3001

AppDataSource.initialize().then(() => {
    console.log(`Server is running on http://localhost:${port}/api (v${version})`)
    app.listen(port, () => { })
})