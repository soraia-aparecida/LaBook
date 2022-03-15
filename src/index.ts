import app from './app'
import { userRouter } from './routes/userRouter'
import { postRouter } from './routes/postRouter'
import { feedRouter } from './routes/feedRouter'

app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/feed', feedRouter)

