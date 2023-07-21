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
 * Fonction pour afficher une boîte avec des options personnalisées
 * @param {string} message
 * @param {TitleMessage} title
 */
function displayBox(
    message: string,
    title: TitleMessage = TitleMessage.BIENVENUE,
) {
    let customOptions = { ...defaultBoxOptions }

    // Appliquer la couleur de bordure et le titre
    // en fonction de l'enumération
    if (title === TitleMessage.INFORMATION) {
        customOptions.title = TitleMessage.INFORMATION
        customOptions.borderColor = ColorName.CYAN
    } else if (title === TitleMessage.SUCCESS) {
        customOptions.title = TitleMessage.SUCCESS
        customOptions.borderColor = ColorName.GREEN
    } else if (title === TitleMessage.ERROR) {
        customOptions.title = TitleMessage.ERROR
        customOptions.borderColor = ColorName.RED
    } else if (title === TitleMessage.WARNING) {
        customOptions.title = TitleMessage.WARNING
        customOptions.borderColor = ColorName.YELLOW
    } else if (title === TitleMessage.DIVERS) {
        customOptions.title = TitleMessage.DIVERS
        customOptions.borderColor = ColorName.GREY
    }

    console.log(
        boxen(message, {
            title,
            ...customOptions,
        }),
    )
}

/**
 * Permet d'afficher un message informant une action
 * @param {string} message
 */
export function boxInfo(message: string) {
    return displayBox(message, TitleMessage.INFORMATION)
}

/**
 * Permet d'afficher un message de succès
 * Exmple : const error: any = new Error(`Désolé cette page n'existe pas!\n`)
 *          boxError(error.message, error.stack)
 * @param {string} message
 * @param {any} errorStack
 */
export function boxError(message: string, errorStack: any) {
    displayBox(errorStack, TitleMessage.ERROR)
}

/**
 * Permet d'afficher un message de succès
 * @param {string} message
 */
export function boxSuccess(message: string) {
    displayBox(message, TitleMessage.SUCCESS)
}

/**
 * Permet d'afficher un message de warning
 * @param {string} message
 */
export function boxWarning(message: string) {
    displayBox(message, TitleMessage.WARNING)
}

export function boxDivers(message: string) {
    displayBox(message, TitleMessage.DIVERS)
}
