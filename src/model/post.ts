export enum POST_TYPE {
    NORMAL = "NORMAL",
    EVENTO = "EVENTO"
}

export type PostInputDTO = {

    photo_url: string,
    description: string,
    post_type: POST_TYPE
}

export type PostData = {
    id: string,
    photo_url: string,
    description: string,
    creation_date: string,
    post_type: string,
    author_id: string,
    author_name: string
}

export class Post {
    constructor(
        protected id: string,
        protected photo_url: string,
        protected description: string,
        protected creation_date: string,
        protected post_type: POST_TYPE,
        protected author_id: string

    ) { }

    public getId(): string {
        return this.id
    }

    public getPhotoUrl(): string {
        return this.photo_url
    }

    public getDescription(): string {
        return this.description
    }

    public getCreate_date(): string {
        return this.creation_date
    }

    public getPostType(): POST_TYPE {
        return this.post_type
    }
    public getAuthorId(): string {
        return this.author_id
    }

    static toPostModel(data: Post) {
        return new Post(data.id, data.photo_url, data.description, data.creation_date, data.post_type, data.author_id)
    }
}