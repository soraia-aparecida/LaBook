export type loginInputDTO = {
    email: string,
    password: string
}

export type signupInputDTO = {
    name: string,
    email: string,
    password: string
}

export class User {
    
    constructor(
        protected id: string,
        protected name: string,
        protected email: string,
        protected password: string,

    ) { }

    public getId(): string {
        return this.id
    }

    public getName(): string {
        return this.name
    }

    public getEmail(): string {
        return this.email
    }

    public getPassword(): string {
        return this.password
    }

    static toUserModel(data: User) {
        return new User(data.id, data.name, data.email, data.password)
    }
} 