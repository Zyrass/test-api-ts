// Dépendances
import { Schema, model } from 'mongoose'
import 'dotenv/config'

// Interfaces
import {
    IMessage,
    IMessageDoc,
    IMessageModel,
} from '../interfaces/IMessage.interface'

const COLLECTION_NAME_MONGODB: string = String(
    process.env.MONGODB_COLLECTION_NAME,
)

const MessageSchema = new Schema<IMessageDoc, IMessage>(
    {
        name: {
            type: String,
            required: [true, 'Ce champ est obligatoire'],
        },
        description: {
            type: String,
            required: [true, 'Ce champ est obligatoire'],
        },
    },
    {
        timestamps: true,
    },
)

const MessageModel = model<IMessageDoc, IMessageModel>(
    COLLECTION_NAME_MONGODB,
    MessageSchema,
)

export default MessageModel
