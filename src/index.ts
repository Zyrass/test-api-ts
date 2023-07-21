// Dépendances et Types
import express, { Application } from "express";

// Controller
import Bienvenue from "./controller/Bienvenue.controller";

// Connexion à la DB
import {
  getConnexionDBLocal, // DB LOCAL
  getConnexionDBOnline, // DB ONLINE
} from "./database/connexion.database";

getConnexionDBLocal();
// getConnexionDBOnline()

// Routing
import ipoviewAPIRoute from "./routes/ipoviewAPI.route";

// Initialisation
const app: Application = express();
const host: string = process.env.HOST || "localhost";
const port: string = process.env.PORT || "3000";

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Middleware en lien avec le point d'entrée de l'API
 */
app.use("/api", ipoviewAPIRoute);

// Ecoute du server
app.listen(port, () => {
  console.log(`connected to http://${host}:${port}`);
  console.log(Bienvenue.information);
});
