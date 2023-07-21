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
                `La connexion à la base de donnée "${DATABASE_NAME}" en local est bien joignable.`,
            ),
        )
        .catch(() =>
            boxWarning(
                `La connexion à la base de donnée "${DATABASE_NAME}" en local a échoué`,
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
                `La connexion à la base de donnée "${DATABASE_NAME}" en ligne est bien joignable.`,
            ),
        )
        .catch(() => {
            boxWarning(
                `La connexion à la base de donnée "${DATABASE_NAME}" en ligne a échoué`,
            )
        })
}
