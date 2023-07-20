// Types
import { Model, Document } from 'mongoose'

export interface IMessage {
    name: string
    description: string
}

export interface IMessageDoc extends IMessage, Document {}

export interface IMessageModel extends Model<IMessageDoc> {}
