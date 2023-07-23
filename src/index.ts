import { NextFunction, Response, response } from 'express'
// Dépendances et Types
import express, { Application, Request } from 'express'

// Controller
import Bienvenue from './controller/Bienvenue.controller'

// Services
import { boxInfo, boxDivers, boxError } from './services/SBoxen.service'
import { slogger } from './services/SLogger.service'

// Connexion à la DB
import {
    getConnexionDBLocal, // DB LOCAL
    getConnexionDBOnline, // DB ONLINE
} from './database/connexion.database'

// Routing
import ipoviewAPIRoute from './routes/ipoviewAPI.route'
import { ESTATUS_CODES } from './Enums/EMessage.enum'

// Initialisation
const app: Application = express()
const host: string = process.env.HOST || 'localhost'
const port: string = process.env.PORT || '3000'

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Middleware pour enregistrer les logs HTTP de chaque requête
app.use((req, res, next) => {
    const logMessageHTTP = `🌎 ${req.method} ${req.url} - ${req.ip}`
    slogger.http(logMessageHTTP)
    next()
})

/**
 * Redirige vers /api vu qu'il n'y a rien sur cette route
 * @param {Request} req
 * @param {Response} res
 */
app.get('/', (req: Request, res: Response) => {
    // utilisation du service slogger
    slogger.warn(
        `⚠️ Redirection permanente vers /api, code retourné: ${ESTATUS_CODES.REDIRECT_PERMANENTLY}`,
    )
    res.status(ESTATUS_CODES.REDIRECT_PERMANENTLY).redirect('/api')
})

/**
 * Middleware en lien avec le point d'entrée de l'API
 */
app.use('/api', ipoviewAPIRoute)

/**
 * Middleware pour se prémunier d'une une route qui n'existerai pas
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
app.use('/*', (req: Request, res: Response, next: NextFunction) => {
    const error: any = new Error(`Désolé cette page n'existe pas!\n`)
    boxError(error.message, error.stack)
    slogger.error(
        `❌ - Désolé, ${req.originalUrl} n'existe pas, code retourné ${ESTATUS_CODES.NOT_FOUND}`,
    )
    res.status(ESTATUS_CODES.NOT_FOUND).json({
        title: 'Page 404',
        errorMessage: `Désolé cette page n'existe pas`,
    })
    next()
})

// Ecoute du server
app.listen(port, () => {
    // Message informatif
    boxInfo(Bienvenue.information)
    slogger.http(
        `✅ Le serveur Express a été démarré et est maintenant accessible à l'adresse : http://${host}:${port}`,
    )
    boxDivers(
        `Le serveur Express a été démarré et est maintenant accessible à l'adresse : http://${host}:${port}/`,
    )

    // Connexion à la DB (Local OR Online)
    process.env.host === 'localhost' || process.env.host === '127.0.0.1'
        ? getConnexionDBLocal()
        : getConnexionDBOnline()
})
