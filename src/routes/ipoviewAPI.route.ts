// Dépendances & Types
import { Router, Request, Response, NextFunction } from 'express'

// Controller
import Message from '../controller/Message.controller'

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

export default router
