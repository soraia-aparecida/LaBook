import { Request, Response } from "express"
import { FriendshipBusiness } from "../business/FriendshipBusiness"
import { FriendshipInputDTO, UnfriendshipInputDTO } from "../model/friendship"

const friendshipBusiness = new FriendshipBusiness()

export class FriendshipController {

    public makeFriendshipBusiness = async (req: Request, res: Response): Promise<void> => {

        try {
            const inputCreateFriendship: FriendshipInputDTO = {
                friend_id: req.body.friend_id
            }

            const token = req.headers.authorization as string

            await friendshipBusiness.makeFriendshipBusiness(token, inputCreateFriendship)

            res.status(201).send({message: "Nova amizade criada com sucesso!"})

        } catch (error: any) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }

    public unfriendBusiness = async (req: Request, res: Response): Promise<void> => {

        try {
            const inputDeleteFriendship: UnfriendshipInputDTO = {
                unfriend_id: req.body.unfriend_id
            }

            const token = req.headers.authorization as string

            await friendshipBusiness.unfriendBusiness(token, inputDeleteFriendship)

            res.status(200).send({message: "Amizade desfeita com sucesso!"})

        } catch (error: any) {
            res.status(error.code || 400).send(error.message || error.sqlMessage)
        }
    }

}