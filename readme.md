# Creation d'une application basic en TS

Conception d'une application basic pour comprendre comment typescript fonctionne.

## I - Comment sa marche

1. Il faut mongodb de démarrer (_Vérifier les services_)
2. La connexion se fait via une DB en local
3. le nom de la DB en local est **test_api_ts**

## II - Commande à saisir dans un terminal

```sh
# Installation des dépendances
npm i

# Démarrage du server
npm run start:dev
```

## III - Utiliser postman

1. Importer le fichier situé dans le répertoire **./backup/postman**
2. Faire les tests sur : **API_TS without UnitTest** (_sans les tests unitaires_)

## IV - Amélioration à faire

-   Correction des tests unitaires
-   Ajout de plusieurs data de base
-   Créer un backup de la db
-   Restaurer la db à l'installation

## V - Bonus

### V-1 - Liens utile

-   https://khalilstemmler.com/blogs/typescript/node-starter-project/
-   https://github.com/goldbergyoni/nodebestpractices
-   

### V-2 - Liens DEPENDANCES

-   **winston** : https://www.npmjs.com/package/winston
-   **chalk** : https://www.npmjs.com/package/chalk
