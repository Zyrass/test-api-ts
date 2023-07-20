import { Router, Request, Response, NextFunction } from "express";
import ipoviewControllerAPI from "../controller/ipoviewAPI.controller";

const router = Router();

// GET
router.get("/", ipoviewControllerAPI.getHome);
router.get("/messages", ipoviewControllerAPI.getAllMessages);
router.get("/messages/:id", ipoviewControllerAPI.getOneMessageByID);

// POST
router.post("/messages/add", ipoviewControllerAPI.postAddNewMessage);

// PUT
router.put("/messages/edit/:id", ipoviewControllerAPI.putEditMessageByID);

// DELETE
router.delete("/messages/delete/:id", ipoviewControllerAPI.deleteMessageByID);

/**
 * Middleware pour se prémunier d'une une route qui n'existerai pas
 */
router.use("/*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    title: "Page 404",
    errorMessage: "Désolé cette page n'existe pas",
  });
  next();
});

export default router;
