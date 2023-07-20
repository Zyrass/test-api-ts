import express, { Application } from "express";
import getConnexionDB from "./database/connexion.database";
import ipoviewAPIRoute from "./routes/ipoviewAPI.route";

getConnexionDB();

const app: Application = express();
const port: string = process.env.PORT || "3000";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Middleware en lien avec le point d'entrée de l'API
 */
app.use("/api", ipoviewAPIRoute);

app.listen(port, () => console.log(`connected to http://localhost:${port}`));
