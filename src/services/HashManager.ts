import * as bycript from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

export class HasManager {
    public generateHash = async (text: string): Promise<string> => {

        const rounds = Number(process.env.BCRYPT_COST)
        const salt = await bycript.genSalt(rounds)
        const result = await bycript.hash(text, salt)
        return result
    }

    public compareHash = async (text: string, hash: string): Promise<boolean> => {
        const result = await bycript.compare(text, hash)
        return result
    }
}