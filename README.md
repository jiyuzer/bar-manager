# Bar Manager - Web App

Une application web de gestion de commandes pour barman avec thème nightclub.

## 🚀 Fonctionnalités

- **22 Tables personnalisables** avec noms et historique
- **Gestion des commandes** en temps réel
- **4 catégories de boissons** : Spiritueux, Champagnes, Prémiums, Softs
- **Sélection de mixers** automatique pour les spiritueux
- **Calcul du Jackpot** (forfait - consommé)
- **Historique des clôtures** par table
- **Encaissement** avec ventilation espèces/carte
- **Persistance locale** avec localStorage
- **Interface nightclub** sombre et élégante
- **Réorganisation des tables** par drag-and-drop

## 📋 Installation

```bash
# Cloner le repository
git clone https://github.com/jiyuzer/bar-manager.git
cd bar-manager

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application s'ouvrira automatiquement sur `http://localhost:3000`

## 🛠️ Build pour la production

```bash
npm run build
```

Les fichiers compilés seront dans le dossier `dist/`.

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── TableCard.tsx
│   ├── DrinkPicker.tsx
│   ├── MixerModal.tsx
│   └── CloseTableModal.tsx
├── constants/           # Constantes
│   ├── colors.ts
│   ├── drinks.ts
│   └── tables.ts
├── context/             # Context API
│   └── BarContext.tsx
├── pages/               # Pages principales
│   ├── TableListPage.tsx
│   └── TableDetailPage.tsx
├── types/               # Types TypeScript
│   └── index.ts
├── hooks/               # Hooks personnalisés
│   └── useColors.ts
├── App.tsx              # Composant root
└── main.tsx             # Point d'entrée
```

## 🎨 Thème

- **Fond** : #0a0808 (noir profond)
- **Cartes** : #1a1410 (marron foncé)
- **Or** : #d4a017
- **Texte** : #f0e6c8 (crème)
- **Police** : Inter (Google Fonts)

## 💾 Données

Toutes les données sont sauvegardées localement dans `localStorage` sous la clé `@bar_manager_tables_v3`.

## 📱 Responsif

L'application est entièrement responsive et fonctionne sur :
- Ordinateurs
- Tablettes
- Mobiles

## 🚀 Déploiement

Pour déployer sur GitHub Pages, Netlify, ou Vercel :

```bash
npm run build
```

Puis uploadez le contenu du dossier `dist/`.

## 📝 Licence

Ce projet est personnel. Tous droits réservés.
