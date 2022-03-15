import { CustomError } from "../error/CustomError"
import { Comment } from "../model/comment"
import { Like } from "../model/like"
import { Post } from "../model/post"
import BaseDatabase from "./BaseDatabase"

export class PostDatabase extends BaseDatabase {
    protected TABLE_NAME_POST = 'Labook_Post'
    protected TABLE_NAME_LIKE = 'Labook_Likes'
    protected TABLE_NAME_COMMENT = 'Labook_Comment'

    public insertPost = async (post: Post): Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME_POST)
            .insert(post)
    }

    public getPost = async (id: string): Promise<Post> => {
        const [post] = await BaseDatabase.connection(this.TABLE_NAME_POST)
            .select()
            .where({ id })

        const newPost = post && Post.toPostModel(post)
        return newPost
    }

    public likePost = async (like: Like): Promise<void> => {
        const result = await BaseDatabase.connection(this.TABLE_NAME_LIKE)
            .where('post_id', like.getPostId())
            .andWhere('user_id', like.getUserId())

        if (result.length > 0) {
            throw new CustomError(409, "Você já curtiu este post.")
        }

        await BaseDatabase.connection(this.TABLE_NAME_LIKE)
            .insert(like)
    }

    public deslikePost = async (deslike: Like): Promise<void> => {
        const result = await BaseDatabase.connection(this.TABLE_NAME_LIKE)
            .where('post_id', deslike.getPostId())
            .andWhere('user_id', deslike.getUserId())

        if (result.length === 0) {
            throw new CustomError(409, "Você não curtiu este post.")
        }

        await BaseDatabase.connection(this.TABLE_NAME_LIKE)
            .delete()
            .where('post_id', deslike.getPostId())
            .andWhere('user_id', deslike.getUserId())
    }

    public insertCommentPost = async (comment: Comment): Promise<void> => {
        await BaseDatabase.connection(this.TABLE_NAME_COMMENT)
            .insert(comment)
    }
}