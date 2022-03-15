import { FeedData } from "../model/friendship"
import BaseDatabase from "./BaseDatabase"

export class FeedDatabade extends BaseDatabase {
    protected TABLE_NAME_ONE = 'Labook_Friendship'
    protected TABLE_NAME_TWO = 'Labook_Post'

    public getFeed = async (id: string, offset: number, limit: number): Promise<FeedData[]> => {
        const recipe = await BaseDatabase.connection(this.TABLE_NAME_ONE)
            .select('Labook_Post.id', 'photo_url', 'description', 'creation_date', 'post_type', 'Labook_Post.author_id', 'name')
            .innerJoin('Labook_Post', 'Labook_Friendship.friend_followed_id', 'Labook_Post.author_id')
            .innerJoin('Labook_User', 'Labook_User.id', 'Labook_Friendship.friend_followed_id')
            .orderBy("creation_date", "DESC")
            .where('friend_follower_id', `${id}`)
            .limit(limit)
            .offset(offset)

        return recipe
    }

    public getFeedByType = async (type: string, offset: number, limit: number): Promise<FeedData[]> => {
        const recipe = await BaseDatabase.connection(this.TABLE_NAME_TWO)
            .select('Labook_Post.id', 'photo_url', 'description', 'creation_date', 'post_type', 'Labook_Post.author_id', 'name')
            .innerJoin('Labook_User', 'Labook_User.id', 'Labook_Post.author_id')
            .orderBy("creation_date", "DESC")
            .where('Labook_Post.post_type', 'like', `%${type}%`)
            .limit(limit)
            .offset(offset)

        return recipe
    }
}