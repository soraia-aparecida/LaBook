import BaseDatabase from "./BaseDatabase"
import { Friendship } from "../model/friendship"
import { CustomError } from "../error/CustomError"

export class FriendshipBaseDatabase extends BaseDatabase {
    protected TABLE_NAME = 'Labook_Friendship'

    public insertFriendship = async (friendship: Friendship): Promise<void> => {
        const result = await BaseDatabase.connection(this.TABLE_NAME)
            .where('friend_follower_id', friendship.getFriendFollower())
            .andWhere('friend_followed_id', friendship.getFriendFollowed())

        if (result.length > 0) {
            throw new CustomError(409, "Você já é amiga dessa pessoa.")
        }

        await BaseDatabase.connection(this.TABLE_NAME)
            .insert({
                friend_follower_id: friendship.getFriendFollower(),
                friend_followed_id: friendship.getFriendFollowed(),
            })

        await BaseDatabase.connection(this.TABLE_NAME)
            .insert({
                friend_follower_id: friendship.getFriendFollowed(),
                friend_followed_id: friendship.getFriendFollower(),
            })
    }

    public deleteFriendship = async (friendship: Friendship): Promise<void> => {
        const result = await BaseDatabase.connection(this.TABLE_NAME)
            .where('friend_follower_id', friendship.getFriendFollower())
            .andWhere('friend_followed_id', friendship.getFriendFollowed())

        if (result.length === 0) {
            throw new CustomError(409, "Você não é amiga dessa pessoa.")
        }

        await BaseDatabase.connection(this.TABLE_NAME)
            .delete()
            .where('friend_follower_id', friendship.getFriendFollower())
            .andWhere('friend_followed_id', friendship.getFriendFollowed())

        await BaseDatabase.connection(this.TABLE_NAME)
            .delete()
            .where('friend_follower_id', friendship.getFriendFollowed())
            .andWhere('friend_followed_id', friendship.getFriendFollower())
    }
}