// Types
import { Request, Response } from 'express'
import { Types } from 'mongoose'

// Model
import MessageModel from '../models/ipoviewMessage.model'

// Interfaces
import {
    IMessage,
    IMessageDoc,
    IMessageModel,
} from '../interfaces/IMessage.interface'

// Enum
export enum CodeStatus {
    SUCCESS = 200,
    CREATED = 201,
    REDIRECT_PERMANENTLY = 301,
    REDIRECT_TEMPORARLY = 302,
    NOT_MODIFIED = 304,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    GATEWAY_TIMEOUT = 504,
}

export default class Message {
    public static information: string =
        'Class contenant toutes les routes de cette API'

    constructor() {}

    /**
     * Affiche la page d'accueil (ici aucune donc on retourne un status 404 - Page Not Found)
     * @param {Request} req
     * @param {Response} res
     */
    public getHome(req: Request, res: Response): void {
        res.status(CodeStatus.NOT_FOUND).json({
            title: 'Page 404',
            message: 'Désolé cette page ne contient aucune data',
        })
    }

    /**
     * Permet d'afficher tous les messages
     * @param {Request} req
     * @param {Response} res
     */
    public async getAllMessages(req: Request, res: Response) {
        try {
            const counter: number = await MessageModel.countDocuments()

            if (counter == 0) {
                return res.status(CodeStatus.SUCCESS).json({
                    title: 'Liste des documents',
                    counterDocument: counter,
                    documents: 'Actuellement aucun document de disponible',
                })
            }

            if (counter > 0) {
                const allDocuments: IMessage[] =
                    await MessageModel.find<IMessageDoc>()
                res.status(CodeStatus.SUCCESS).json({
                    title: 'Voir la liste de tous les documents',
                    counterDocument: counter,
                    documents: allDocuments,
                })
            }
        } catch (error: any) {
            if (error instanceof Error) {
                console.log(error.stack)
                res.status(CodeStatus.INTERNAL_SERVER_ERROR).json({
                    title: error.name,
                    message: error.message,
                })
            }
        }
    }

    /**
     * Permet d'afficher le contenu d'un message selon un ID
     * @param {Request} req
     * @param {Response} res
     */
    public async getOneMessageByID(req: Request, res: Response) {
        try {
            const id: string = req.params.id
            let checkValidObjectID: boolean = Types.ObjectId.isValid(id)

            if (!checkValidObjectID) {
                return res.status(CodeStatus.BAD_REQUEST).json({
                    title: 'Récupération impossible',
                    message: `L'ID saisie (${id}), n'existe pas`,
                })
            }

            const currentMessage = await MessageModel.findOne<IMessageDoc>({
                _id: id,
            })

            res.status(CodeStatus.SUCCESS).json({
                title: 'Récupération réussie',
                message: {
                    id: currentMessage!._id, // not null (!)
                    name: currentMessage!.name, // not null (!)
                    description: currentMessage!.description, // not null (!)
                },
            })
        } catch (error: any) {
            if (error instanceof Error) {
                console.log(error.stack)
                res.status(CodeStatus.INTERNAL_SERVER_ERROR).json({
                    title: error.name,
                    message: error.message,
                })
            }
        }
    }

    /**
     * Permet d'ajouter un nouveau message
     * @param {Request} req
     * @param {Response} res
     */
    public async postAddNewMessage(req: Request, res: Response) {
        try {
            const name: string = req.body.name ? req.body.name.trim() : null
            const description: string = req.body.description
                ? req.body.description.trim()
                : null

            if (!name && !description) {
                return res.status(CodeStatus.BAD_REQUEST).json({
                    title: 'Erreur de saisie',
                    message: 'Tous les champs sont obligatoire',
                })
            }

            if (name && !description) {
                return res.status(CodeStatus.BAD_REQUEST).json({
                    title: 'Erreur de saisie',
                    message: 'Le champ description est obligatoire',
                })
            }

            if (!name && description) {
                return res.status(CodeStatus.BAD_REQUEST).json({
                    title: 'Erreur de saisie',
                    message: 'Le champ nom est obligatoire',
                })
            }

            const newMessage = await new MessageModel<IMessage>({
                name,
                description,
            })

            newMessage.save() // Enregistrement du nouveau message

            res.status(CodeStatus.CREATED).json({
                message: 'Enregistrement réussi avec succès',
                body: {
                    name,
                    description,
                },
            })
        } catch (error: any) {
            if (error instanceof Error) {
                console.log(error.stack)
                res.status(CodeStatus.INTERNAL_SERVER_ERROR).json({
                    title: error.name,
                    message: error.message,
                })
            }
        }
    }

    /**
     * Permet de mettre à jour un message via un ID
     * @param {Request} req
     * @param {Response} res
     */
    public async putEditMessageByID(req: Request, res: Response) {
        try {
            const id: string = req.params.id.trim()
            const checkIsValidObjectId: boolean = Types.ObjectId.isValid(id)
            if (!checkIsValidObjectId) {
                return res.status(CodeStatus.BAD_REQUEST).json({
                    title: 'Bad Request',
                    message: "Cet ID n'existe pas dans la base de donnée",
                })
            }

            const name: string = req.body.name ? req.body.name.trim() : null
            const description: string = req.body.description
                ? req.body.description.trim()
                : null

            if (!name && !description) {
                return res.status(CodeStatus.BAD_REQUEST).json({
                    title: 'Erreur de saisie',
                    message: 'Tous les champs sont obligatoire',
                })
            }

            if (name && !description) {
                return res.status(CodeStatus.BAD_REQUEST).json({
                    title: 'Erreur de saisie',
                    message:
                        'Il vous manque le champ description qui est obligatoire',
                })
            }

            if (!name && description) {
                return res.status(CodeStatus.BAD_REQUEST).json({
                    title: 'Erreur de saisie',
                    message: 'Il vous manque le champ nom qui est obligatoire',
                })
            }

            const currentMessageBeforeUpdate =
                await MessageModel.findOne<IMessageDoc>({
                    _id: id,
                })

            await MessageModel.updateOne<IMessageModel>(
                { _id: id },
                { $set: req.body },
                { new: true },
            )

            const currentMessageAfterUpdate =
                await MessageModel.findOne<IMessageDoc>({
                    _id: id,
                })

            if (currentMessageAfterUpdate) {
                console.log({
                    protocolUsed: 'PUT',
                    status: CodeStatus.SUCCESS,
                    before: {
                        id: currentMessageBeforeUpdate!._id,
                        name: currentMessageBeforeUpdate!.name,
                        description: currentMessageBeforeUpdate!.description,
                    },
                    after: {
                        id: currentMessageAfterUpdate._id,
                        name: currentMessageAfterUpdate.name,
                        description: currentMessageAfterUpdate.description,
                    },
                })
                res.status(CodeStatus.SUCCESS).json({
                    message: 'Le message a été mis à jour avec succès',
                })
            }
        } catch (error: any) {
            if (error instanceof Error) {
                console.log("Erreur sur l'édition:")
                console.log(error.stack)
                res.status(CodeStatus.INTERNAL_SERVER_ERROR).json({
                    title: error.name,
                    message: error.message,
                })
            }
        }
    }

    /**
     * Permet de supprimer un message via un ID
     * @param {Request} req
     * @param {Response} res
     */
    public async deleteMessageByID(req: Request, res: Response) {
        try {
            const id: string = req.params.id ? req.params.id.trim() : ''
            const checkValidObjectID = Types.ObjectId.isValid(id)
            if (!checkValidObjectID) {
                return res.status(CodeStatus.BAD_REQUEST).json({
                    title: 'Forbidden',
                    message: `Vous ne pouvez pas faire ceci, l'id "${id}" n'existe pas.`,
                })
            }

            const currentMessage = await MessageModel.findOne<IMessageDoc>({
                _id: id,
            })

            if (currentMessage != null) {
                const responseDeleteMessage = await MessageModel.deleteOne({
                    _id: id,
                })

                if (
                    responseDeleteMessage.deletedCount != undefined &&
                    responseDeleteMessage.deletedCount > 0
                ) {
                    res.status(CodeStatus.SUCCESS).json({
                        message: 'Suppression réussi avec succès',
                        body: {
                            id: currentMessage._id,
                            name: currentMessage.name,
                            description: currentMessage.description,
                        },
                    })
                }
            } else {
                res.status(CodeStatus.BAD_REQUEST).json({
                    title: 'Page Not Found',
                    message: `Désolé, mais l'ID "${id} n'existe plus en base`,
                })
            }
        } catch (error: any) {
            console.log(error.stack)
            res.status(CodeStatus.INTERNAL_SERVER_ERROR).json({
                title: error.name,
                message: error.message,
            })
        }
    }
}
