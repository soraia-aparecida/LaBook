import express from 'express'
import cors from 'cors'
import { userRouter } from './routes/userRouter'
import { postRouter } from './routes/postRouter'
import { feedRouter } from './routes/feedRouter'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/feed', feedRouter)

app.listen(process.env.PORT || 3003, () => {
    console.log('Servidor rodando na porta 3003')
})