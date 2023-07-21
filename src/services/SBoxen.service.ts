// Dépendances
import boxen from "boxen";

// Interfaces & Enums
import {
  IBoxenOptions,
  IBoxenOptionAlignement,
} from "../interfaces/IBoxen.interface";
import { Error } from "mongoose";
import Message from "../controller/Message.controller";

/**
 * Permet d'afficher un message informant une action
 * @param {string} message
 * @param {string} status
 */
export function boxInfo(
  message: string,
  status: string = "IPOView - Information"
) {
  console.log(
    boxen(message, {
      title: status,
      titleAlignment: "left",
      textAlignment: "center",
      padding: 1,
      borderStyle: "round",
      borderColor: "cyanBright",
      float: "left",
      margin: {
        top: 1,
        right: 0,
        bottom: 1,
        left: 0,
      },
    })
  );
}

/**
 * Permet d'afficher un message de succès
 * @param {string} message
 * @param {string} status
 */
export function boxSuccess(
  message: string,
  status: string = "IPOView - Success"
) {
  console.log(
    boxen(message, {
      title: status,
      titleAlignment: "left",
      textAlignment: "center",
      padding: 1,
      borderStyle: "round",
      borderColor: "greenBright",
      float: "left",
      margin: {
        top: 1,
        right: 0,
        bottom: 1,
        left: 0,
      },
    })
  );
}

/**
 * Permet d'afficher un message de succès
 * @param {string} message
 * @param {string} status
 */
function boxErrorTitle(
  message: string,
  title?: string,
  status: string = "IPOView - Error"
) {
  console.log(
    boxen(message, {
      title: "IPOView - Error (Name)",
      titleAlignment: "left",
      textAlignment: "center",
      padding: 0,
      borderStyle: "round",
      borderColor: "redBright",
      float: "left",
      margin: {
        top: 1,
        right: 0,
        bottom: 1,
        left: 0,
      },
    })
  );
}

/**
 * Permet d'afficher le message d'erreur
 * @param {any} message
 */
function boxErrorMessage(messageError: any) {
  console.log(
    boxen(messageError, {
      title: "IPOView - Error (message)",
      titleAlignment: "left",
      textAlignment: "center",
      padding: 1,
      borderStyle: "round",
      borderColor: "redBright",
      float: "left",
      margin: {
        top: 1,
        right: 0,
        bottom: 1,
        left: 0,
      },
    })
  );
}

/**
 * Permet d'afficher la stack d'erreur
 * @param {any} messageError
 */
function boxErrorStack(messageError: any) {
  console.log(
    boxen(messageError.stack, {
      title: "IPOView - Error (Stack)",
      textAlignment: "left",
      padding: 1,
      borderStyle: "round",
      borderColor: "redBright",
      float: "left",
      margin: {
        top: 1,
        right: 0,
        bottom: 1,
        left: 0,
      },
    })
  );
}

export function boxError(
  titleError: Error,
  messageError: Error,
  stackError: Error
) {
  boxErrorTitle(titleError.name);
  boxErrorMessage(messageError.message);
  boxErrorStack(stackError.stack);
}

/**
 * Permet d'afficher un message de succès
 * @param {string} message
 * @param {string} status
 */
export function boxWarning(
  message: string,
  status: string = "IPOView - Warning"
) {
  console.log(
    boxen(message, {
      title: status,
      titleAlignment: "left",
      textAlignment: "center",
      padding: 1,
      borderStyle: "round",
      borderColor: "yellowBright",
      float: "right",
      margin: {
        top: 1,
        right: 0,
        bottom: 1,
        left: 0,
      },
    })
  );
}
