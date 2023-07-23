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

// Services
import {
    boxDivers,
    boxError,
    boxSuccess,
    boxWarning,
} from '../services/SBoxen.service'

// Enum
import { ESTATUS_CODES } from '../Enums/EMessage.enum'
import { slogger } from '../services/SLogger.service'

class Message {
    public static information: string = `la classe Message offre toutes les fonctionnalités nécessaires pour gérer la ressource "message" dans l'API, en permettant la création, la lecture, la mise à jour et la suppression des messages, tout en fournissant des codes d'état HTTP appropriés et des messages d'erreur clairs en cas de problème.`

    constructor() {}

    /**
     * Affiche la page d'accueil (ici aucune donc on retourne un status 404 - Page Not Found)
     * @param {Request} req
     * @param {Response} res
     */
    public getHome(req: Request, res: Response): void {
        // Service SLogger (Winston)
        slogger.http(`✅ - ${req.method} : ${req.originalUrl}`)
        slogger.warn(`⚠️ - Aucune data à afficher sur ${req.originalUrl}`)

        // Service SBoxen (boxen)
        boxWarning(
            `⚠️ - Il n'y a aucune data à afficher sur ${req.originalUrl}`,
        )

        res.status(ESTATUS_CODES.NOT_FOUND).json({
            title: 'Page 404', // Code d'erreur à revoir
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
                // Service SLogger (Winston)
                slogger.http(`✅ - ${req.method} : ${req.originalUrl}`)
                slogger.warn(
                    `⚠️ - Aucune data à afficher sur ${req.originalUrl}`,
                )

                // Service SBoxen (boxen)
                boxWarning(
                    `⚠️ - Actuellement il n'y a aucun document à afficher.`,
                )

                return res.status(ESTATUS_CODES.SUCCESS).json({
                    title: 'Liste des documents',
                    counterDocument: counter,
                    documents: 'Actuellement aucun document de disponible',
                })
            }

            if (counter > 0) {
                const allDocuments: IMessage[] =
                    await MessageModel.find<IMessageDoc>()

                // Service SLogger (Winston)
                slogger.http(`✅ - ${req.method} : ${req.originalUrl}`)
                slogger.info(`✅ Traitement réussie sur ${req.originalUrl}.`)

                // Service SBoxen (boxen)
                boxSuccess(
                    `✅ - Vous avez récupérer ${counter} ${
                        counter > 1 ? 'documents' : 'document'
                    }`,
                )

                res.status(ESTATUS_CODES.SUCCESS).json({
                    title: 'Voir la liste de tous les documents',
                    counterDocument: counter,
                    documents: allDocuments,
                })
            }
        } catch (error: any) {
            if (error instanceof Error) {
                // Service SLogger (Winston)
                slogger.http(`❌ - ${req.method} : ${req.originalUrl}`)
                slogger.error(
                    `❌ - Erreur rencontré sur ${req.originalUrl} : ${error.message}`,
                )

                // Service SBoxen (boxen)
                boxError(error.message, error.stack)

                res.status(ESTATUS_CODES.INTERNAL_SERVER_ERROR).json({
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
                // Service SLogger (Winston)
                slogger.http(`⚠️ - ${req.method} : ${req.originalUrl}`)
                slogger.error(
                    `❌ - L'id passé en paramètre n'existe pas sur ${req.originalUrl}`,
                )

                // Service SBoxen (boxen)
                boxWarning(
                    `❌ - L'id passé en paramètre n'existe pas sur ${req.originalUrl}`,
                )
                return res.status(ESTATUS_CODES.BAD_REQUEST).json({
                    title: 'Récupération impossible',
                    message: `L'ID saisie (${id}), n'existe pas`,
                })
            }

            const currentMessage = await MessageModel.findOne<IMessageDoc>({
                _id: id,
            })

            // Service SLogger (Winston)
            slogger.http(`✅ - ${req.method} : ${req.originalUrl}`)
            slogger.info(`✅ - Récupération réussie sur ${req.originalUrl}`)

            // Service SBoxen (boxen)
            boxSuccess(`✅ - Récupération réussie sur ${req.originalUrl}`)

            res.status(ESTATUS_CODES.SUCCESS).json({
                title: 'Récupération réussie',
                message: {
                    id: currentMessage!._id, // not null (!)
                    name: currentMessage!.name, // not null (!)
                    description: currentMessage!.description, // not null (!)
                },
            })
        } catch (error: any) {
            if (error instanceof Error) {
                // Service SLogger (Winston)
                slogger.http(`⚠️ - ${req.method} : ${req.originalUrl}`)
                slogger.error(
                    `❌ - Erreur rencontré sur ${req.originalUrl}: ${error.message}`,
                )

                // Service SBoxen (boxen)
                boxError(error.message, error.stack)

                res.status(ESTATUS_CODES.INTERNAL_SERVER_ERROR).json({
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
                // Service SLogger (Winston)
                slogger.http(`⚠️ - ${req.method} : ${req.originalUrl}`)
                slogger.warn(
                    `⚠️ - Tous les champs sont obligatoire sur ${req.originalUrl}, code retourné ${ESTATUS_CODES.UNPROCESSABLE_ENTITY}`,
                )

                // Service SBoxen (boxen)
                boxWarning(
                    `⚠️ - Tous les champs sont obligatoire sur ${req.originalUrl}, code retourné ${ESTATUS_CODES.UNPROCESSABLE_ENTITY}`,
                )
                return res.status(ESTATUS_CODES.UNPROCESSABLE_ENTITY).json({
                    title: 'Erreur de saisie',
                    message: 'Tous les champs sont obligatoire',
                })
            }

            if (name && !description) {
                // Service SLogger (Winston)
                slogger.http(`⚠️ - ${req.method} : ${req.originalUrl}`)
                slogger.warn(
                    `⚠️ - Le champ description est obligatoire sur ${req.originalUrl}, code retourné ${ESTATUS_CODES.UNPROCESSABLE_ENTITY}`,
                )

                // Service SBoxen (boxen)
                boxWarning(
                    `⚠️ - Le champ description est obligatoire sur ${req.originalUrl}, code retourné ${ESTATUS_CODES.UNPROCESSABLE_ENTITY}`,
                )
                return res.status(ESTATUS_CODES.UNPROCESSABLE_ENTITY).json({
                    title: 'Erreur de saisie',
                    message: 'Le champ description est obligatoire',
                })
            }

            if (!name && description) {
                // Service SLogger (Winston)
                slogger.http(`⚠️  - ${req.method} : ${req.originalUrl}`)
                slogger.warn(
                    `⚠️  - Le champ nom est obligatoire sur ${req.originalUrl}, code retourné ${ESTATUS_CODES.UNPROCESSABLE_ENTITY}`,
                )

                // Service SBoxen (boxen)
                boxWarning(
                    `⚠️  - Le champ nom est obligatoire sur ${req.originalUrl}, code retourné ${ESTATUS_CODES.UNPROCESSABLE_ENTITY}`,
                )
                return res.status(ESTATUS_CODES.UNPROCESSABLE_ENTITY).json({
                    title: 'Erreur de saisie',
                    message: 'Le champ nom est obligatoire',
                })
            }

            const newMessage = await new MessageModel<IMessage>({
                name,
                description,
            })

            newMessage.save() // Enregistrement du nouveau message

            // Service SLogger (Winston)
            slogger.http(`✅ - ${req.method} : ${req.originalUrl}`)
            slogger.info(
                `✅ - Enregistrement réussi avec succès sur ${req.originalUrl}, code retourné ${ESTATUS_CODES.SUCCESS}`,
            )

            // Service SBoxen (boxen)
            boxSuccess(
                `✅ - Enregistrement réussi avec succès sur ${req.originalUrl}, code retourné ${ESTATUS_CODES.SUCCESS}`,
            )

            res.status(ESTATUS_CODES.CREATED).json({
                message: 'Enregistrement réussi avec succès',
                body: {
                    name,
                    description,
                },
            })
        } catch (error: any) {
            if (error instanceof Error) {
                // Service SLogger (Winston)
                slogger.http(`⚠️ - ${req.method} : ${req.originalUrl}`)
                slogger.error(
                    `❌ - Erreur rencontré sur ${req.originalUrl}: ${error.message}`,
                )

                // Service SBoxen (boxen)
                boxError(error.message, error.stack)

                res.status(ESTATUS_CODES.INTERNAL_SERVER_ERROR).json({
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
                // Service SLogger (Winston)
                slogger.http(`⚠️ - ${req.method} : ${req.originalUrl}`)
                slogger.error(
                    `❌ - L'id passé en paramètre n'existe pas sur ${req.originalUrl}, code retourné ${ESTATUS_CODES.BAD_REQUEST}`,
                )

                // Service SBoxen (boxen)
                boxWarning(
                    `❌ - L'id passé en paramètre n'existe pas sur ${req.originalUrl}, code retourné ${ESTATUS_CODES.BAD_REQUEST}`,
                )
                return res.status(ESTATUS_CODES.BAD_REQUEST).json({
                    title: 'Bad Request',
                    message: "Cet ID n'existe pas dans la base de donnée",
                })
            }

            const name: string = req.body.name ? req.body.name.trim() : null
            const description: string = req.body.description
                ? req.body.description.trim()
                : null

            if (!name && !description) {
                // Service SLogger (Winston)
                slogger.http(`⚠️ - ${req.method} : ${req.originalUrl}`)
                slogger.warn(
                    `⚠️ - Tous les champs sont obligatoire sur ${req.originalUrl}, code retourné ${ESTATUS_CODES.UNPROCESSABLE_ENTITY}`,
                )

                // Service SBoxen (boxen)
                boxWarning(
                    `⚠️ - Tous les champs sont obligatoire sur ${req.originalUrl}, code retourné ${ESTATUS_CODES.UNPROCESSABLE_ENTITY}`,
                )
                return res.status(ESTATUS_CODES.BAD_REQUEST).json({
                    title: 'Erreur de saisie',
                    message: 'Tous les champs sont obligatoire',
                })
            }

            if (name && !description) {
                // Service SLogger (Winston)
                slogger.http(`⚠️ - ${req.method} : ${req.originalUrl}`)
                slogger.warn(
                    `⚠️ - Le champ description est obligatoire sur ${req.originalUrl}, code retourné ${ESTATUS_CODES.UNPROCESSABLE_ENTITY}`,
                )

                // Service SBoxen (boxen)
                boxWarning(
                    `⚠️ - Le champ description est obligatoire sur ${req.originalUrl}, code retourné ${ESTATUS_CODES.UNPROCESSABLE_ENTITY}`,
                )
                return res.status(ESTATUS_CODES.BAD_REQUEST).json({
                    title: 'Erreur de saisie',
                    message:
                        'Il vous manque le champ description qui est obligatoire',
                })
            }

            if (!name && description) {
                // Service SLogger (Winston)
                slogger.http(`⚠️ - ${req.method} : ${req.originalUrl}`)
                slogger.warn(
                    `⚠️ - Le champ nom est obligatoire sur ${req.originalUrl}, code retourné ${ESTATUS_CODES.UNPROCESSABLE_ENTITY}`,
                )

                // Service SBoxen (boxen)
                boxWarning(
                    `⚠️ - Le champ nom est obligatoire sur ${req.originalUrl}, code retourné ${ESTATUS_CODES.UNPROCESSABLE_ENTITY}`,
                )
                return res.status(ESTATUS_CODES.BAD_REQUEST).json({
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
                // Service SLogger (Winston)
                slogger.http(`✅ - ${req.method} : ${req.originalUrl}`)
                slogger.info(
                    `✅ - Modification réussi avec succès sur ${req.originalUrl}, code retourné ${ESTATUS_CODES.SUCCESS}`,
                )

                // Service SBoxen (boxen)
                boxSuccess(
                    `✅ - Modification réussi avec succès sur ${req.originalUrl}, code retourné ${ESTATUS_CODES.SUCCESS}`,
                )

                const essai = {
                    protocolUsed: 'PUT',
                    status: ESTATUS_CODES.SUCCESS,
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
                }

                boxDivers(JSON.stringify(essai))
                console.log({
                    resultUpdate: essai,
                })

                res.status(ESTATUS_CODES.SUCCESS).json({
                    message: 'Le message a été mis à jour avec succès',
                })
            }
        } catch (error: any) {
            if (error instanceof Error) {
                console.log("Erreur sur l'édition:")
                console.log(error.stack)
                res.status(ESTATUS_CODES.INTERNAL_SERVER_ERROR).json({
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
                // Service SLogger (Winston)
                slogger.http(`⚠️ - ${req.method} : ${req.originalUrl}`)
                slogger.error(
                    `❌ - L'id passé en paramètre n'existe pas sur ${req.originalUrl}`,
                )

                // Service SBoxen (boxen)
                boxWarning(
                    `❌ - L'id passé en paramètre n'existe pas sur ${req.originalUrl}`,
                )

                return res.status(ESTATUS_CODES.BAD_REQUEST).json({
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
                    // Service SLogger (Winston)
                    slogger.http(`✅ - ${req.method} : ${req.originalUrl}`)
                    slogger.info(
                        `✅ - Suppression réussi avec succès sur ${req.originalUrl}, code retourné ${ESTATUS_CODES.SUCCESS}`,
                    )

                    // Service SBoxen (boxen)
                    boxSuccess(
                        `✅ - Suppression réussi avec succès sur ${req.originalUrl}, code retourné ${ESTATUS_CODES.SUCCESS}`,
                    )

                    res.status(ESTATUS_CODES.SUCCESS).json({
                        message: 'Suppression réussi avec succès',
                        body: {
                            id: currentMessage._id,
                            name: currentMessage.name,
                            description: currentMessage.description,
                        },
                    })
                }
            } else {
                // Service SLogger (Winston)
                slogger.http(`⚠️ - ${req.method} : ${req.originalUrl}`)
                slogger.warn(
                    `⚠️ - Suppression impossible sur ${req.originalUrl} l'id n'existe plus, code retourné ${ESTATUS_CODES.BAD_REQUEST}`,
                )

                // Service SBoxen (boxen)
                boxWarning(
                    `⚠️ - Suppression impossible sur ${req.originalUrl} l'id n'existe plus, code retourné ${ESTATUS_CODES.BAD_REQUEST}`,
                )
                res.status(ESTATUS_CODES.BAD_REQUEST).json({
                    title: 'Page Not Found',
                    message: `Désolé, mais l'ID "${id} n'existe plus en base`,
                })
            }
        } catch (error: any) {
            // Service SLogger (Winston)
            slogger.http(`⚠️ - ${req.method} : ${req.originalUrl}`)
            slogger.error(
                `❌ - Erreur rencontré sur ${req.originalUrl}: ${error.message}`,
            )

            // Service SBoxen (boxen)
            boxError(error.message, error.stack)

            res.status(ESTATUS_CODES.INTERNAL_SERVER_ERROR).json({
                title: error.name,
                message: error.message,
            })
        }
    }
}

export default Message
