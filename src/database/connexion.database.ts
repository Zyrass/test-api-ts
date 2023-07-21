// Dépendances & Types
import mongoose from "mongoose";
import "dotenv/config";

// Services
import { boxSuccess } from "../services/SBoxen.service";

// Variables d'environnementsconst
const PSEUDO = process.env.MONGODB_PSEUDO;
const PASSWORD = process.env.MONGODB_PASSWORD;
const CLUSTER_NAME = process.env.MONGODB_CLUSTER_NAME;
const DATABASE_NAME = process.env.MONGODB_DATABASE_NAME;

// Connexion à la base de donnée en locale
export const getConnexionDBLocal = () => {
  try {
    mongoose
      .connect(`mongodb://127.0.0.1:27017/test_api_ts`)
      .then((response) => {
        if (response) {
          boxSuccess("Connected to Local Database");
        }
      })
      .catch(() => {
        throw new Error("Connexion échoué à la database en local");
      });
  } catch (error: any) {
    if (error instanceof Error) {
      // boxError(error.name, error.message, error.stack);
    }
  }
};

// Connexion à la base de donnée en ligne
export const getConnexionDBOnline = async () => {
  try {
    const connexionDB = await mongoose.connect(
      `mongodb+srv://${PSEUDO}:${PASSWORD}@${CLUSTER_NAME}.fkabvbd.mongodb.net/${DATABASE_NAME}`
    );
    if (connexionDB) {
      console.log("Connected to Online Database");
    }
  } catch (error: any) {
    if (error instanceof Error) {
      console.log({
        title: error.name,
        message: error.message,
      });
    }
  }
};
