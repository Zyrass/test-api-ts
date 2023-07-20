import mongoose from "mongoose";
import dotenv from "dotenv";
import { error } from "console";

dotenv.config();

// Variables d'environnementsconst
const PSEUDO = process.env.MONGODB_PSEUDO;
const PASSWORD = process.env.MONGODB_PASSWORD;
const CLUSTER_NAME = process.env.MONGODB_CLUSTER_NAME;
const DATABASE_NAME = process.env.MONGODB_DATABASE_NAME;

// const getConnexionDB = async () => {
//   try {
//     const connexionDB = await mongoose.connect(
//       `mongodb+srv://${PSEUDO}:${PASSWORD}@${CLUSTER_NAME}.fkabvbd.mongodb.net/${DATABASE_NAME}`
//     );
//     if (connexionDB) {
//       console.log("Connected to Database");
//     }
//   } catch (error: any) {
//     if (error instanceof Error) {
//       console.log({
//         title: error.name,
//         message: error.message,
//       });
//     }
//   }
// };

const getConnexionDB = () => {
  try {
    mongoose
      .connect(`mongodb://127.0.0.1:27017/test_api_ts`)
      .then((response) => {
        if (response) {
          console.log("Connected to Database");
        }
      })
      .catch(() => {
        throw new Error("connexion db");
      });
  } catch (error: any) {
    if (error instanceof Error) {
      console.log({
        title: error.name,
        message: error.message,
      });
    }
  }
};

export default getConnexionDB;
