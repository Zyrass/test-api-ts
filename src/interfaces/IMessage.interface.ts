// Types
// Importation des types nécessaires depuis le module 'mongoose'.
// 'Model' est utilisé pour définir un modèle de données pour une collection MongoDB.
// 'Document' est utilisé pour définir le type d'un document (enregistrement) dans MongoDB.
import { Model, Document } from 'mongoose'

// Interface IMessage
// C'est une interface qui définit la structure d'un message.
export interface IMessage {
    name: string
    description: string
}

// Interface IMessageDoc
// C'est une interface qui étend l'interface IMessage et Document.
// Elle définit la structure d'un document MongoDB pour la collection 'messages'.
export interface IMessageDoc extends IMessage, Document {}

// Interface IMessageModel
// C'est une interface qui étend Model<IMessageDoc>.
// Elle représente le modèle de données pour la collection 'messages' en MongoDB.
export interface IMessageModel extends Model<IMessageDoc> {}
