// Dépendances
// Importation des modules nécessaires depuis 'mongoose'.
// 'Schema' est utilisé pour définir la structure de la collection MongoDB.
// 'model' est utilisé pour créer un modèle de données à partir du schéma.
import { Schema, model } from 'mongoose'
import 'dotenv/config'

// Interfaces
// Importation des interfaces IMessage, IMessageDoc et IMessageModel depuis le fichier IMessage.interface.ts.
import {
    IMessage,
    IMessageDoc,
    IMessageModel,
} from '../interfaces/IMessage.interface'

// Récupération du nom de la collection MongoDB depuis les variables d'environnement.
const COLLECTION_NAME_MONGODB: string = String(
    process.env.MONGODB_COLLECTION_NAME,
)

// Définition du schéma (Schema) pour la collection 'messages' en MongoDB.
// Le schéma est défini en utilisant les interfaces IMessageDoc et IMessage pour définir
// la structure du document (enregistrement) dans la collection.
const MessageSchema = new Schema<IMessageDoc, IMessage>(
    {
        name: {
            type: String,
            required: [true, 'Le champ Nom est obligatoire'],
        },
        description: {
            type: String,
            required: [true, 'Le champ Nom est obligatoire'],
        },
    },
    {
        timestamps: true, // Ajoute automatiquement 'createdAt' et 'updatedAt' pour chaque document.
    },
)

// Création du modèle de données (MessageModel) à partir du schéma (MessageSchema).
// Le modèle est associé à la collection MongoDB dont le nom est spécifié par COLLECTION_NAME_MONGODB.
const MessageModel = model<IMessageDoc, IMessageModel>(
    COLLECTION_NAME_MONGODB, // Nom de la collection MongoDB.
    MessageSchema, // Schéma utilisé pour définir la structure des documents de la collection.
)

// Exportation du modèle de données (MessageModel).
export default MessageModel
