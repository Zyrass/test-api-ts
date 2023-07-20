import { Request, Response, response } from "express";
import Message from "../models/ipoviewMessage.model";
import {
  IMessage,
  IMessageDoc,
  IMessageModel,
} from "../interfaces/IMessage.interface";
import { Error, isValidObjectId } from "mongoose";

/**
 * Affiche la page d'accueil (ici aucune donc on retourne un status 404 - Page Not Found)
 * @param {Request} req
 * @param {Response} res
 */
const getHome = (req: Request, res: Response) => {
  res.status(404).json({
    title: "Page 404",
    message: "Désolé cette page ne contient aucune data",
  });
};

/**
 * Permet d'afficher tous les messages
 * @param {Request} req
 * @param {Response} res
 */
const getAllMessages = async (req: Request, res: Response) => {
  try {
    const counter = await Message.countDocuments();

    if (counter == 0) {
      return res.status(200).json({
        title: "Voir la liste de tous les documents",
        counterDocument: counter,
        documents: "Actuellement aucun document de disponible",
      });
    }

    if (counter > 0) {
      const allDocuments: IMessage[] = await Message.find<IMessageDoc>();
      res.status(200).json({
        title: "Voir la liste de tous les documents",
        counterDocument: counter,
        documents: allDocuments,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log(error);
    }

    res.status(404).json({
      title: "Echec message",
      message: "il n'existe aucun messages dans la base",
    });
  }
};

/**
 * Permet d'afficher le contenu d'un message selon un ID
 * @param {Request} req
 * @param {Response} res
 */
const getOneMessageByID = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    let checkValidObjectID: boolean = isValidObjectId(id);
    if (!checkValidObjectID) {
      return res.status(404).json({
        title: "Récupération impossible",
        message: `L'ID saisie (${id}), n'existe pas`,
      });
    }

    const currentMessage = await Message.findOne<IMessageDoc>({
      _id: id,
    });

    res.status(200).json({
      title: "Récupération réussie",
      message: {
        id: currentMessage!._id,
        name: currentMessage!.name,
        description: currentMessage!.description,
      },
    });
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error.stack);
      res.status(500).json({
        title: error.name,
        message: error.message,
      });
    }
  }
};

/**
 * Permet d'ajouter un nouveau message
 * @param {Request} req
 * @param {Response} res
 */
const postAddNewMessage = async (req: Request, res: Response) => {
  try {
    const name: string = req.body.name ? req.body.name.trim() : null;
    const description: string = req.body.description
      ? req.body.description.trim()
      : null;

    if (!name && !description) {
      return res.status(200).json({
        title: "Erreur de saisie",
        message: "Tous les champs sont obligatoire",
      });
    }

    if (name && !description) {
      return res.status(200).json({
        title: "Erreur de saisie",
        message: "Le champ description est obligatoire",
      });
    }

    if (!name && description) {
      return res.status(200).json({
        title: "Erreur de saisie",
        message: "Le champ nom est obligatoire",
      });
    }

    const newMessage = await new Message<IMessage>({
      name,
      description,
    });

    newMessage.save();
    res.status(201).json({
      message: "Enregistrement réussi avec succès",
      body: {
        name,
        description,
      },
    });
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error.stack);
      res.status(500).json({
        title: error.name,
        message: error.message,
      });
    }
  }
};

/**
 * Permet de mettre à jour un message via un ID
 * @param {Request} req
 * @param {Response} res
 */
const putEditMessageByID = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id.trim();
    const checkIsValidObjectId: boolean = isValidObjectId(id);
    if (!checkIsValidObjectId) {
      return res.status(404).json({
        title: "Page Not Found",
        message: "Cet ID n'existe pas dans la base de donnée",
      });
    }

    const name: string = req.body.name ? req.body.name.trim() : null;
    const description: string = req.body.description
      ? req.body.description.trim()
      : null;

    if (!name && !description) {
      return res.status(200).json({
        title: "Erreur de saisie",
        message: "Tous les champs sont obligatoire",
      });
    }

    if (name && !description) {
      return res.status(200).json({
        title: "Erreur de saisie",
        message: "Il vous manque le champ description qui est obligatoire",
      });
    }

    if (!name && description) {
      return res.status(200).json({
        title: "Erreur de saisie",
        message: "Il vous manque le champ nom qui est obligatoire",
      });
    }

    const currentMessageBeforeUpdate = await Message.findOne<IMessageDoc>({
      _id: id,
    });

    await Message.updateOne<IMessageModel>(
      { _id: id },
      { $set: req.body },
      { new: true }
    );

    const currentMessageAfterUpdate = await Message.findOne<IMessageDoc>({
      _id: id,
    });

    if (currentMessageAfterUpdate) {
      console.log({
        protocolUsed: "PUT",
        status: 200,
        before: {
          id: currentMessageBeforeUpdate!._id,
          name: currentMessageBeforeUpdate!.name,
          description: currentMessageBeforeUpdate!.description,
        },
        after: {
          id: currentMessageAfterUpdate._id,
          name: currentMessageAfterUpdate.name,
          description: currentMessageAfterUpdate.description,
        },
      });
      res.status(200).json({
        message: "Le message a été mis à jour avec succès",
      });
    }
  } catch (error: any) {
    if (error instanceof Error) {
      console.log("Erreur sur l'édition:");
      console.log(error.stack);
      res.status(500).json({
        title: error.name,
        message: error.message,
      });
    }
  }
};

const deleteMessageByID = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id ? req.params.id.trim() : "";
    const checkValidObjectID = isValidObjectId(id);

    if (!checkValidObjectID) {
      return res.status(403).json({
        title: "Forbidden",
        message: `Vous ne pouvez pas faire ceci, l'id "${id}" n'existe pas.`,
      });
    }

    const currentMessage = await Message.findOne<IMessageDoc>({
      _id: id,
    });

    if (currentMessage != null) {
      const responseDeleteMessage = await Message.deleteOne({
        _id: id,
      });

      console.log(responseDeleteMessage);

      if (
        responseDeleteMessage.deletedCount != undefined &&
        responseDeleteMessage.deletedCount > 0
      ) {
        res.status(200).json({
          message: "Suppression réussi avec succès",
          body: {
            id: currentMessage._id,
            name: currentMessage.name,
            description: currentMessage.description,
          },
        });
      }
    } else {
      res.status(404).json({
        title: "Page Not Found",
        message: `Désolé, mais l'ID "${id} n'existe plus en base`,
      });
    }
  } catch (error: any) {
    console.log(error.stack);
    res.status(500).json({
      title: error.name,
      message: error.message,
    });
  }
};

export default {
  getHome,
  getAllMessages,
  getOneMessageByID,
  postAddNewMessage,
  putEditMessageByID,
  deleteMessageByID,
};
