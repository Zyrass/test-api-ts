// Dépendances et Types
import express, { Application } from 'express'

// Controller
import Bienvenue from './controller/Bienvenue.controller'

// Services
import { boxInfo, boxDivers } from './services/SBoxen.service'

// Connexion à la DB
import {
    getConnexionDBLocal, // DB LOCAL
    getConnexionDBOnline, // DB ONLINE
} from './database/connexion.database'

// Routing
import ipoviewAPIRoute from './routes/ipoviewAPI.route'

// Initialisation
const app: Application = express()
const host: string = process.env.HOST || 'localhost'
const port: string = process.env.PORT || '3000'

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * Middleware en lien avec le point d'entrée de l'API
 */
app.use('/api', ipoviewAPIRoute)

// Ecoute du server
app.listen(port, () => {
    // Message informatif
    boxInfo(Bienvenue.information)
    boxDivers(
        `Le serveur Express est démarré et accessible à cette adresse : http://${host}:${port}/`,
    )

    // Connexion à la DB (Local OR Online)
    process.env.host === 'localhost' || process.env.host === '127.0.0.1'
        ? getConnexionDBLocal()
        : getConnexionDBOnline()
})
