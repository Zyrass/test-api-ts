// Dépendances & Types
import { connect } from 'mongoose'
import 'dotenv/config'

// Services
import { boxSuccess, boxWarning } from '../services/SBoxen.service'

// Variables d'environnementsconst
const PSEUDO = process.env.MONGODB_PSEUDO
const PASSWORD = process.env.MONGODB_PASSWORD
const CLUSTER_NAME = process.env.MONGODB_CLUSTER_NAME
const DATABASE_NAME = process.env.MONGODB_DATABASE_NAME

// Connexion à la base de donnée en locale
export function getConnexionDBLocal() {
    connect(`mongodb://127.0.0.1:27017/test_api_ts`)
        .then(() =>
            boxSuccess(
                `La connexion à la base de données "${DATABASE_NAME}" en local a été établie avec succès.\nVous pouvez désormais interagir avec la base de données et accéder aux données nécessaires pour votre application.`,
            ),
        )
        .catch(() =>
            boxWarning(
                `La connexion à la base de données "${DATABASE_NAME}" en local n'a pas pu être établie.\nVeuillez vérifier les paramètres de connexion et vous assurer que la base de données est accessible et fonctionnelle.`,
            ),
        )
}

// Connexion à la base de donnée en ligne
export function getConnexionDBOnline() {
    connect(
        `mongodb+srv://${PSEUDO}:${PASSWORD}@${CLUSTER_NAME}.fkabvbd.mongodb.net/${DATABASE_NAME}`,
    )
        .then(() =>
            boxSuccess(
                `La connexion à la base de données "${DATABASE_NAME}" en ligne a été établie avec succès.\nVous pouvez désormais interagir avec la base de données et accéder aux données nécessaires pour votre application.`,
            ),
        )
        .catch(() => {
            boxWarning(
                `La connexion à la base de données "${DATABASE_NAME}" en ligne n'a pas pu être établie.\nVeuillez vérifier les paramètres de connexion et vous assurer que la base de données est accessible et fonctionnelle.`,
            )
        })
}
