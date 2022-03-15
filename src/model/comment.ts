export class Comment {
    constructor(
        private user_id: string,
        private post_id: string,
        private comment: string
    ) { }

    public getUserId(): string {
        return this.user_id
    }

    public getPostId(): string {
        return this.post_id
    }

    public getComment(): string {
        return this.comment
    }
}

export type CommentInputDTO = {
    post_id: string,
    comment: string
}