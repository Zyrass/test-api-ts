// Dépendances & Types
import boxen from 'boxen'

// Enums
import {
    AlignementName,
    BorderStyleName,
    ColorName,
    TitleMessage,
} from './../Enums/EBoxen.enum'

// Options par défaut pour les boîtes
const defaultBoxOptions: boxen.Options = {
    title: TitleMessage.BIENVENUE,
    titleAlignment: AlignementName.LEFT,
    textAlignment: AlignementName.LEFT,
    borderStyle: BorderStyleName.ROUND,
    float: AlignementName.LEFT,
    margin: {
        top: 1,
        right: 0,
        bottom: 1,
        left: 0,
    },
    padding: 1,
    borderColor: ColorName.GREY,
    backgroundColor: ColorName.BLACK,
    dimBorder: false,
}

/**
 * ### IPOVIew - Boxen personnalisé
 * @description _Affiche une boîte boxen avec des options personnalisées en fonction du titre_.
 *
 * @function displayBox
 * @param {string} message
 * @param {TitleMessage} [title=TitleMessage.BIENVENUE] - Le titre de la boîte boxen pour obtenir un style différent automatiquement.
 *                                                      Les valeurs possibles sont : TitleMessage.BIENVENUE, TitleMessage.INFORMATION,
 *                                                      TitleMessage.SUCCESS, TitleMessage.ERROR, TitleMessage.WARNING, TitleMessage.DIVERS.
 * @default TitleMessage.BIENVENUE
 * @throws {Error} Si le titre spécifié n'est pas reconnu.
 * @returns {void}
 * ---
 * @example
 * // Exemple d'utilisation :
 * displayBox("Ceci est un message d'information", TitleMessage.INFORMATION)
 *
 * @service SBoxen
 * @file SBoxen.service.ts
 * @version 1.0.0
 * @since 23/07/2023
 * @author Alain Guillon
 */
function displayBox(
    message: string,
    title: TitleMessage = TitleMessage.BIENVENUE,
): void {
    // Copie par valeur de l'objet defaultOptions
    let customOptions = { ...defaultBoxOptions }

    // Appliquer la couleur de bordure et le titre en fonction de l'enumération du titre
    switch (title) {
        case TitleMessage.INFORMATION:
            customOptions.title = TitleMessage.INFORMATION
            customOptions.borderColor = ColorName.CYAN
            break
        case TitleMessage.SUCCESS:
            customOptions.title = TitleMessage.SUCCESS
            customOptions.borderColor = ColorName.GREEN
            break
        case TitleMessage.ERROR:
            customOptions.title = TitleMessage.ERROR
            customOptions.borderColor = ColorName.RED
            break
        case TitleMessage.WARNING:
            customOptions.title = TitleMessage.WARNING
            customOptions.borderColor = ColorName.YELLOW
            break
        case TitleMessage.DIVERS:
            customOptions.title = TitleMessage.DIVERS
            customOptions.borderColor = ColorName.GREY
            break
        default:
            throw new Error('Titre non reconnu : ' + title)
    }

    // Afficher la boîte boxen avec le message et les options personnalisées
    console.log(
        boxen(message, {
            title,
            ...customOptions,
        }),
    )
}

/**
 * ### IPOVIew - Information
 * @description _Permet d'afficher un message informant une action_.
 *
 * @function boxInfo
 * @param {string} message
 * @param {TitleMessage} TitleMessage.INFORMATION
 * @throws {Error} Si le titre spécifié n'est pas reconnu.
 * @returns {void}
 * ---
 * @example
 * // Exemple d'utilisation :
 * displayBox("Ceci est un message d'information", TitleMessage.INFORMATION)
 *
 * @service SBoxen
 * @file SBoxen.service.ts
 * @version 1.0.0
 * @see displayBox
 * @since 23/07/2023
 * @author Alain Guillon
 */
export function boxInfo(message: string): void {
    displayBox(message, TitleMessage.INFORMATION)
}

/**
 * ### IPOVIew - Error
 * @description _Permet d'afficher un message d'erreur_.
 *
 * @function boxError
 * @param {string} message
 * @param {any} errorStack
 * @returns {void}
 * ---
 * @example
 * // Exemple d'utilisation :
 * const error: any = new Error(`Désolé cette page n'existe pas!\n`)
 * boxError(error.message, error.stack)
 *
 * @service SBoxen
 * @file SBoxen.service.ts
 * @version 1.0.0
 * @see displayBox
 * @since 23/07/2023
 * @author Alain Guillon
 */
export function boxError(message: string, errorStack: any): void {
    displayBox(errorStack, TitleMessage.ERROR)
}

/**
 * ### IPOVIew - Success
 * @description _Permet d'afficher un message de succès_.
 *
 * @function boxSuccess
 * @param {string} message
 * @param {TitleMessage} TitleMessage.SUCCESS
 * @throws {Error} Si le titre spécifié n'est pas reconnu.
 * @returns {void}
 * ---
 * @example
 * // Exemple d'utilisation :
 * boxSuccess("Bravo vous avez créer un message de succès", TitleMessage.SUCCESS)
 *
 * @service SBoxen
 * @file SBoxen.service.ts
 * @version 1.0.0
 * @see displayBox
 * @since 23/07/2023
 * @author Alain Guillon
 */
export function boxSuccess(message: string): void {
    displayBox(message, TitleMessage.SUCCESS)
}

/**
 * ### IPOVIew - Warning
 * @description _Permet d'afficher un message de warning_.
 *
 * @function boxWarning
 * @param {string} message
 * @param {TitleMessage} TitleMessage.WARNING
 * @throws {Error} Si le titre spécifié n'est pas reconnu.
 * @returns {void}
 * ---
 * @example
 * // Exemple d'utilisation :
 * boxWarning("Attention vous avez créer un message de succès", TitleMessage.WARNING)
 *
 * @service SBoxen
 * @file SBoxen.service.ts
 * @version 1.0.0
 * @see displayBox
 * @since 23/07/2023
 * @author Alain Guillon
 */
export function boxWarning(message: string): void {
    displayBox(message, TitleMessage.WARNING)
}

/**
 * ### IPOVIew - Divers
 * @description _Permet d'afficher un message divers_.
 *
 * @function boxDivers
 * @param {string} message
 * @param {TitleMessage} TitleMessage.DIVERS
 * @throws {Error} Si le titre spécifié n'est pas reconnu.
 * @returns {void}
 * ---
 * @example
 * // Exemple d'utilisation :
 * boxDivers("Il fait beau aujourd'hui", TitleMessage.DIVERS)
 *
 * @service SBoxen
 * @file SBoxen.service.ts
 * @version 1.0.0
 * @see displayBox
 * @since 23/07/2023
 * @author Alain Guillon
 */
export function boxDivers(message: string): void {
    displayBox(message, TitleMessage.DIVERS)
}
