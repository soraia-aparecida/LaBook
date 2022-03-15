import { PostDatabase } from "../data/PostDatabase"
import { UserDatabase } from "../data/UserDatabase"
import { CustomError } from "../error/CustomError"
import { Comment, CommentInputDTO } from "../model/comment"
import { Like, LikeInputDTO } from "../model/like"
import { Post, PostData, PostInputDTO } from "../model/post"
import { Authetication } from "../services/Authentication"
import { CorrectDate } from "../services/CorretDate"
import { IdGenerator } from "../services/IdGenerator"

const authentication = new Authetication()
const userDatabase = new UserDatabase()
const correctDate = new CorrectDate()
const idGenerator = new IdGenerator()
const postDatabase = new PostDatabase()

export class PostBusiness {

    public createPostBusiness = async (post: PostInputDTO, token: string): Promise<void> => {

        if (!token) {
            throw new CustomError(401, "Para realizar essa operação é necessário ter token de autorização")
        }

        if (!post.photo_url || !post.description || !post.post_type) {
            throw new CustomError(422, "Para realizar o cadastro de um novo post é necessário informar os seguintes campos: photo_url, description, post_type.")
        }

        if (post.post_type.toUpperCase() !== "NORMAL" && post.post_type.toUpperCase() !== "EVENTO") {
            throw new CustomError(422, "Por gentileza, informa om post_type válido. Pode ser 'NORMAL' ou 'EVENTO' ")
        }

        const verifyToken = authentication.getTokenData(token)

        const user = await userDatabase.getUserById(verifyToken.id)
        const userId = user.getId()

        const date = new Date().toLocaleDateString("pt-BR")
        const creation_date = correctDate.sendDateToDB(date)

        const id = idGenerator.generateId()

        const newPost = new Post(id, post.photo_url, post.description, creation_date, post.post_type, userId)

        await postDatabase.insertPost(newPost)
    }

    public getPostByIdBusiness = async (id: string, token: string): Promise<PostData> => {

        if (!token) {
            throw new CustomError(401, "Para realizar essa operação é necessário ter token de autorização")
        }

        authentication.getTokenData(token)

        const post = await postDatabase.getPost(id)
        if (!post) {
            throw new CustomError(404, "Post não encontrado, por gentileza informar um id válido")
        }

        const user = await userDatabase.getUserById(post.getAuthorId())

        const newPost = {
            id: post.getId(),
            photo_url: post.getPhotoUrl(),
            description: post.getDescription(),
            creation_date: correctDate.currentDateFormatted(post.getCreate_date()),
            post_type: post.getPostType(),
            author_id: post.getAuthorId(),
            author_name: user.getName()
        }

        return newPost
    }

    public likeBusiness = async (token: string, id: LikeInputDTO): Promise<void> => {

        if (!token) {
            throw new CustomError(401, "Para realizar essa operação é necessário ter token de autorização")
        }

        if (!id.post_id) {
            throw new CustomError(401, "Para curti um post é necesário informar o: post_id.")
        }

        const verifyToken = authentication.getTokenData(token)
        const user = await userDatabase.getUserById(verifyToken.id)
        const userId = user.getId()

        const post = await postDatabase.getPost(id.post_id)
        if (!post) {
            throw new CustomError(404, "Post não encontrado, por gentileza informar um post_id válido")
        }

        const like = new Like(id.post_id, userId)

        await postDatabase.likePost(like)
    }

    public deslikeBusiness = async (token: string, id: LikeInputDTO): Promise<void> => {

        if (!token) {
            throw new CustomError(401, "Para realizar essa operação é necessário ter token de autorização")
        }

        if (!id.post_id) {
            throw new CustomError(401, "Para descurti um post é necesário informar o: post_id.")
        }

        const verifyToken = authentication.getTokenData(token)
        const user = await userDatabase.getUserById(verifyToken.id)
        const userId = user.getId()

        const post = await postDatabase.getPost(id.post_id)
        if (!post) {
            throw new CustomError(404, "Post não encontrado, por gentileza informar um post_id válido")
        }

        const deslike = new Like(id.post_id, userId)

        await postDatabase.deslikePost(deslike)
    }

    public commentBusiness = async (token: string, comment: CommentInputDTO): Promise<void> => {

        if (!token) {
            throw new CustomError(401, "Para realizar essa operação é necessário ter token de autorização")
        }

        if (!comment.post_id) {
            throw new CustomError(401, "Para comentar em um post é necesário informar o: post_id.")
        }

        if (!comment.comment) {
            throw new CustomError(401, "Para comentar em um post é necesário informar o: comment.")
        }

        const verifyToken = authentication.getTokenData(token)
        const user = await userDatabase.getUserById(verifyToken.id)
        const userId = user.getId()

        const post = await postDatabase.getPost(comment.post_id)
        if (!post) {
            throw new CustomError(404, "Post não encontrado, por gentileza informar um post_id válido")
        }

        const newComment = new Comment(userId, comment.post_id, comment.comment)

        await postDatabase.insertCommentPost(newComment)
    }
}