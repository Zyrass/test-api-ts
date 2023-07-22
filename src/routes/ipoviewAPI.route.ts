// Dépendances & Types
import { Router, Request, Response, NextFunction } from 'express'

// Controller
import Message from '../controller/Message.controller'

// Services
import { boxError } from '../services/SBoxen.service'

// Enum
import { ESTATUS_CODES } from '../Enums/EMessage.enum'

const router = Router()
const messageController = new Message()

// GET
router.get('/', messageController.getHome)
router.get('/messages', messageController.getAllMessages)
router.get('/messages/:id', messageController.getOneMessageByID)

// POST
router.post('/messages/add', messageController.postAddNewMessage)

// PUT
router.put('/messages/edit/:id', messageController.putEditMessageByID)

// DELETE
router.delete('/messages/delete/:id', messageController.deleteMessageByID)

/**
 * Middleware pour se prémunier d'une une route qui n'existerai pas
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
router.use('/*', (req: Request, res: Response, next: NextFunction) => {
    const error: any = new Error(`Désolé cette page n'existe pas!\n`)
    boxError(error.message, error.stack)

    res.status(ESTATUS_CODES.NOT_FOUND).json({
        title: 'Page 404',
        errorMessage: `Désolé cette page n'existe pas`,
    })
    next()
})

export default router
