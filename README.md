# ENT Pratique

Guide interactif pour aider les enseignants à choisir le bon outil numérique de l'ENT (Environnement Numérique de Travail) selon leur projet pédagogique.

## Fonctionnalités

- **Trouver un outil** — un questionnaire en 4 étapes qui recommande les outils les plus adaptés à un besoin donné (communiquer, créer, collaborer, évaluer, discuter).
- **Bibliothèque** — l'ensemble des outils disponibles, filtrables par catégorie et consultables en détail (conseils d'utilisation, cas d'usage concrets).
- **Combinaisons** — des enchaînements d'outils éprouvés pour construire des séquences pédagogiques plus ambitieuses (ex. *Mur collaboratif → Forum → Sondage* pour un débat numérique).
- **Défis pédagogiques** — des mises en situation concrètes pour tester un outil ou une combinaison en classe.
- Suivi de progression discret (outils explorés, défis relevés) persisté localement dans le navigateur.

## Stack technique

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/) pour la navigation
- CSS natif (variables CSS, pas de framework)

## Démarrage

```bash
npm install
npm run dev
```

L'application est disponible sur `http://localhost:5173`.

### Autres commandes

```bash
npm run build    # build de production dans dist/
npm run preview  # prévisualiser le build de production
npm run lint      # linter le code
```

## Déploiement (GitHub Pages via GitHub Actions)

Le déploiement est automatique : à chaque push sur `main`, le workflow `.github/workflows/deploy.yml` build le projet et publie le résultat sur GitHub Pages. Aucun fichier compilé n'est committé dans le dépôt.

Configuration à faire une seule fois : **Settings → Pages → Source: GitHub Actions**.

Le site est servi sous `https://<utilisateur>.github.io/ENTpratique/` — le `base` configuré dans `vite.config.js` correspond à ce chemin. Si le dépôt est renommé, mettre à jour `base` en conséquence.

Le routing utilise `HashRouter` (URLs en `#/...`) : aucune configuration serveur supplémentaire n'est nécessaire pour que les liens directs fonctionnent sur un hébergement statique.

Pour déclencher un déploiement manuellement sans nouveau commit : onglet **Actions** du dépôt → workflow *Deploy to GitHub Pages* → **Run workflow**.

## Structure du projet

```
src/
  data/          # catalogue des outils, combinaisons, défis, questions
  hooks/         # useProgress — persistance de la progression (localStorage)
  components/    # pages et composants d'interface
```

## Personnaliser le catalogue d'outils

Le catalogue d'outils ENT est centralisé dans `src/data/tools.js`. Chaque outil suit cette structure :

```js
{
  id: 'messagerie',
  name: 'Messagerie',
  category: 'communication',
  difficulty: 1, // 1 à 3
  summary: 'Résumé court affiché sur la fiche outil.',
  description: 'Description plus détaillée.',
  tips: ['Astuce 1', 'Astuce 2'],
  useCases: ['Cas d\'usage 1', 'Cas d\'usage 2'],
}
```

Les combinaisons (`src/data/combos.js`) et les défis (`src/data/challenges.js`) référencent les outils par leur `id`.

## Licence

Projet personnel — usage libre.
