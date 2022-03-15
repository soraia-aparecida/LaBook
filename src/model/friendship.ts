export class Friendship {
    constructor(
        private friend_follower_id: string,
        private friend_followed_id: string
    ) { }

    public getFriendFollower(): string {
        return this.friend_follower_id
    }

    public getFriendFollowed(): string {
        return this.friend_followed_id
    }
}

export type FriendshipInputDTO = {
    friend_id: string
}

export type UnfriendshipInputDTO = {
    unfriend_id: string
}

export type FeedData = {
    id: string,
    photo_url: string,
    description: string,
    creation_date: string,
    post_type: string,
    author_id: string,
    name: string,
}

