import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { loginInputDTO, signupInputDTO } from "../model/user"

const userBusiness = new UserBusiness()

export class UserController {

    public signupController = async (req: Request, res: Response): Promise<void>  => {

        try {
            const inputSignup: signupInputDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            const inputLogin: loginInputDTO = {
                email: req.body.email,
                password: req.body.password
            }

            await userBusiness.signupBusiness(inputSignup)

            const token = await userBusiness.loginBusiness(inputLogin)

            res.status(201).send({ message: "Novo usuário cadastrado com sucesso", token })

        } catch (error: any) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }

    public loginController = async (req: Request, res: Response): Promise<void>  => {

        try {
            const inputLogin: loginInputDTO = {
                email: req.body.email,
                password: req.body.password
            }

            const token = await userBusiness.loginBusiness(inputLogin)

            res.status(200).send({ message: "Usuário logado com sucesso", token })

        } catch (error: any) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }
}