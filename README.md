# mobicoop-v2

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Mobicoop Instance Build Setup

``` bash
# On build l'instance, elle se génère dans le dossier www
npm run build:[instance-name]

# Copie www dans le dossier public dans le projet Android ou iOS
npx cap copy [platform]

# Ouvre le projet dans Android Studio ou XCode
npx cap open [platform]

# Pour XCode sélectionner le bon scheme puis procédure normale ios

# Pour Android Studio sélectionner le bon Build Variant puis procédure normale android
```

## Create Mobicoop Instance

``` bash

# Créer un fichier environnemnt .env.[instance-name]

# Mettre à jour le fichier package.json avec les commandes serve:[instance-name] et build:[instance-name]

# Dans le projet iOS :
    * Créer un nouveau scheme portant le nom de [instance-name] (Possibilité de dupliquer un ancien scheme)
    * Renommer le fichier -Info.plist créé automatiquement en [instance-name]-Info.plist et modifier ses Target Membership
    * Préciser le nom [instance-name]-Info.plist dans Build Settings -> Info plist File
    * Créer un fichier XCAssets [instance-name]Assets.xcassets et modifier ses Target Membership
    * Ajouter logo et splash dans le fichier XCAssets
    * Ajouter le scheme control script dans Build Phases
    * Ajouter la target dans le Podfile et faire npx cap sync ios

# Dans le projet Android :
    * Ajouter un productFlavors dans le fichier build.gradle (Module: app)
    * Créer un dossier [instance-name] au même niveau que le dossier main
    * Ajouter à l'intérieur une copy des fichier res avec les bons logo et splash screen et en modifiant le fichier strings.xml

```
For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
