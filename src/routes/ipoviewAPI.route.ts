// Dépendances & Types
import { Router, Request, Response, NextFunction } from "express";

// Controller
import Message, { CodeStatus } from "../controller/Message.controller";

// Services
import { boxError } from "../services/SBoxen.service";

const router = Router();
const messageController = new Message();

// GET
router.get("/", messageController.getHome);
router.get("/messages", messageController.getAllMessages);
router.get("/messages/:id", messageController.getOneMessageByID);

// POST
router.post("/messages/add", messageController.postAddNewMessage);

// PUT
router.put("/messages/edit/:id", messageController.putEditMessageByID);

// DELETE
router.delete("/messages/delete/:id", messageController.deleteMessageByID);

/**
 * Middleware pour se prémunier d'une une route qui n'existerai pas
 */
router.use("/*", (req: Request, res: Response, next: NextFunction) => {
  // boxError(`L'URI: ${req.url} n'existe pas`);
  res.status(CodeStatus.NOT_FOUND).json({
    title: "Page 404",
    errorMessage: "Désolé cette page n'existe pas",
  });
  next();
});

export default router;
