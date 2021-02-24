import 'reflect-metadata'
import express from 'express'
import './database'
import { router } from './routes'

const app = express()

const PORT = 3333

app.use(express.json())
app.use(router)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
