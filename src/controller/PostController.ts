import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
import { CommentInputDTO } from "../model/comment"
import { LikeInputDTO } from "../model/like"
import { PostInputDTO } from "../model/post"

const postBusiness = new PostBusiness()

export class PostController {

    public createPostController = async (req: Request, res: Response): Promise<void> => {

        try {
            const inputCreatePost: PostInputDTO = {
                photo_url: req.body.photo_url,
                description: req.body.description,
                post_type: req.body.post_type
            }

            const token = req.headers.authorization as string

            await postBusiness.createPostBusiness(inputCreatePost, token)

            res.status(201).send({ message: "Post criado com sucesso!" })

        } catch (error: any) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }

    public getPostByIdController = async (req: Request, res: Response): Promise<void> => {

        try {
            const token = req.headers.authorization as string
            const id: string = req.params.id

            const post = await postBusiness.getPostByIdBusiness(id, token)
            res.status(200).send({ post })

        } catch (error: any) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }

    public likeController = async (req: Request, res: Response): Promise<void> => {

        try {
            const token = req.headers.authorization as string
            const post_id: LikeInputDTO = { post_id: req.body.post_id }

            await postBusiness.likeBusiness(token, post_id)

            res.status(201).send({message: "Like com sucesso!"})

        } catch (error: any) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }

    public deslikeController = async (req: Request, res: Response): Promise<void> => {

        try {
            const token = req.headers.authorization as string
            const post_id: LikeInputDTO = { post_id: req.body.post_id }

            await postBusiness.deslikeBusiness(token, post_id)

            res.status(200).send({message: "Desike com sucesso!"})

        } catch (error: any) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }

    public commentController = async (req: Request, res: Response): Promise<void> => {

        try {
            const token = req.headers.authorization as string
            const comment: CommentInputDTO = {
                post_id: req.body.post_id,
                comment: req.body.comment
            }

            await postBusiness.commentBusiness(token, comment)

            res.status(201).send({message: "Commentário adicionado com sucesso!"})

        } catch (error: any) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }
}