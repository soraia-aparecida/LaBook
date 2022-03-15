import express from "express"
import { PostController } from "../controller/PostController"

export const postRouter = express.Router()

const postController = new PostController()

postRouter.get('/:id', postController.getPostByIdController)
postRouter.post('/', postController.createPostController)
postRouter.post('/like', postController.likeController)
postRouter.put('/deslike', postController.deslikeController)
postRouter.post('/comment', postController.commentController)


