import { UserDatabase } from "../data/UserDatabase"
import { CustomError } from "../error/CustomError"
import { loginInputDTO, signupInputDTO, User } from "../model/user"
import { Authetication } from "../services/Authentication"
import { HasManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

const userDatabase = new UserDatabase()
const idGenerator = new IdGenerator()
const hasManager = new HasManager()
const authetication = new Authetication()

export class UserBusiness {

    public signupBusiness = async (user: signupInputDTO): Promise<void> => {

        if (!user.name || !user.password || !user.email) {
            throw new CustomError(422, "Para realizar o cadastro de um novo usuário é necessário informar os seguintes campos: name, email, password.")
        }

        if (user.password.length < 6) {
            throw new CustomError(422, "A senha deve conter no mímino 6 caracteres.")
        }

        if (!user.email.includes('@') || !user.email.includes('.com')) {
            throw new CustomError(422, "Formato de email inválido.")
        }

        const checkExistenceOfEmail = await userDatabase.getUserByEmail(user.email)

        if (checkExistenceOfEmail) {
            throw new CustomError(409, "E-mail já cadastrado no nosso banco de dados.")
        }

        const id = idGenerator.generateId()

        const encryptedPassword = await hasManager.generateHash(user.password)

        const newUser = new User(id, user.name, user.email, encryptedPassword)

        await userDatabase.insertUser(newUser)
    }

    public loginBusiness = async (user: loginInputDTO): Promise<string> => {

        if (!user.email || !user.password) {
            throw new CustomError(422, "Para realizar login é necessário informar os seguintes campos:  email, password.")
        }

        const checkUserExistence: User = await userDatabase.getUserByEmail(user.email)

        if (!checkUserExistence) {
            throw new CustomError(404, "E-mail não cadastrado no nosso banco de dados.")
        }

        const passwordIsCorrect: boolean = await hasManager.compareHash(user.password, checkUserExistence.getPassword())

        if (!passwordIsCorrect) {
            throw new CustomError(422, "Password inválido.")
        }

        const token = authetication.generateToken({ id: checkUserExistence.getId() })
        return token
    }
}