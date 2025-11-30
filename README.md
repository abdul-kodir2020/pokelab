# 🎮 PokéLab - Application de Gestion de Pokémon

PokéLab est une application **Angular 20.3.0** complète permettant aux utilisateurs de créer, entraîner et gérer leur propre équipe de Pokémon. L'application combine une authentification sécurisée, une gestion d'état réactive et des fonctionnalités de gameplay avancées.

---

## 📋 Table des matières

1. [Démarrage rapide](#démarrage-rapide)
2. [Fonctionnalités principales](#fonctionnalités-principales)
3. [Architecture technique](#architecture-technique)
4. [Vérification des requirements](#vérification-des-requirements)
5. [Documentation détaillée des fonctionnalités](#documentation-détaillée-des-fonctionnalités)
6. [Commandes disponibles](#commandes-disponibles)

---

## 🚀 Démarrage rapide

### Prérequis
- **Node.js** 18+ et **npm** 9+
- **Angular CLI** 20.3.9+

### Installation

```bash
# 1. Cloner le repository
git clone <repository-url>
cd pokelab

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm start

# 4. Dans un autre terminal, lancer le serveur JSON
npm run server
```

### Accès à l'application

- **Application**: http://localhost:4200
- **Serveur API**: http://localhost:3000

L'application se rechargera automatiquement lors de modifications de fichiers.

### Identifiants de test

```
Utilisateur: dresseur
Mot de passe: test
```

---

## ✨ Fonctionnalités principales

### 1. 🔐 Authentification & Inscription

- **Système de login/register** sécurisé
- Validation des formulaires réactifs
- Persistance de session avec localStorage
- Guards de route pour protéger les pages

**Accès**: Page d'accueil → Login/Register

---

### 2. 🎮 Entraînement et Montée en Niveau

L'entraînement est au cœur du gameplay. Voici comment ça marche:

#### Mécanique de progression
- **10 clics = 1 niveau** (formule: `10 + (level - 1)`)
- Chaque niveau augmente les stats:
  - **HP** (Points de Vie) : +growth HP du type
  - **ATK** (Attaque) : +growth ATK du type

#### Interface d'entraînement
1. Aller sur la **page détail** d'un Pokémon
2. Section "Entraîner mon Pokémon"
3. Cliquer le bouton **💪 Entraîner**
4. Le compteur de clics augmente
5. Une barre de progression affiche l'avancement

#### Indicateurs visuels
- **Badge "LEVEL UP!"** avec animation quand un nouveau niveau est atteint
- Compteur en temps réel des clics
- Barre de progression animée

**Exemple**:
```
Niveau 1 → 10 clics requis → LEVEL UP! → Niveau 2 → 11 clics requis...
```

#### Formule de progression
```typescript
clicksNeeded = 10 + (currentLevel - 1)
// Niveau 1: 10 clics
// Niveau 2: 11 clics
// Niveau 3: 12 clics
// etc...
```
---

### 3. 🔄 Évolution des Pokémon

L'évolution est déclenchée **automatiquement** lors de l'entraînement selon le niveau:

#### Étapes d'évolution
- **Niveau 5** → **Stade 2** (première évolution)
- **Niveau 10** → **Stade 3** (deuxième évolution/forme finale)

#### Interface d'évolution
1. Entraînez votre Pokémon jusqu'au niveau requis
2. Une **modal d'évolution** s'affiche
3. Animation du Pokémon changeant de forme
4. Avant/Après visibles avec transition animée

#### Détails techniques
- Chaque type de Pokémon a une **ligne d'évolution** (evolution_lines)
- 3 stades possibles (stage1, stage2, stage3)
- Les images changent automatiquement dans l'interface
- Les évolutions sont **persistées** dans la base de données

**Exemple**: Pikachu (Lv. 1) → Raichu (Lv. 5) → Raichu Mega (Lv. 10)

#### Progression visuelle
```
Stage 1          Stage 2                   Stage 3
├─ Pikachu ───┬─ (Level 5) ─────────┬──  (Level 10)
│             │                     │
│      Raichu  ├──> Raichu Mega
```
---

### 4. ⭐ Système de Favoris

Marquez vos Pokémon préférés comme favoris:

- **Badge ⭐** visible sur chaque carte
- **Filtrage par favoris**: Afficher uniquement les favoris
- **Toggle au clic**: Cliquer l'étoile pour ajouter/retirer des favoris
- **Persistance**: Sauvegardé automatiquement en base de données
- **Visibilité**: Les favoris apparaissent en premier dans la liste
- **Animation**: Pop-in animation au toggle

---

### 5. 🎨 Mode Collector

Mode spécial pour afficher votre collection de manière esthétique:

#### Activation
- Toggle **🎨 Collector ON/OFF** dans la barre sticky du Pokédex
- État persisté dans localStorage

#### Fonctionnalités
- **Fond d'écran dynamique** par type de Pokémon:
  - **Roche** → Texture rocheuse grise
  - **Plante** → Peinture verte abstraite
  - **Feu** → Galaxy cosmique
  - **Électrik** → Orage électrique
  - **Eau** → Paysage côtier fantastique
  - **Psy** → Nuages magiques

- **Couleurs de texte optimisées** pour chaque fond (blanc, jaune ou gris)
- **Overlay semi-transparent** (rgba(0,0,0,0.4)) pour la lisibilité
- **Cartes agrandies** avec meilleure visibilité
- **Position d'arrière-plan** adaptée (left ou center)

#### Exemple
```
Mode Normal:
├─ Fond blanc uniforme
├─ Texte noir standard
└─ Présentation simple

Mode Collector ON:
├─ Fond thématique du type
├─ Texte couleur-adapté
├─ Overlay pour lisibilité
└─ Cartes plus grandes et esthétiques
```
---

### 6. 🔍 Recherche et Filtrage

Trouvez facilement votre Pokémon:

#### Barre de recherche
- **Recherche en temps réel** par nom
- **Filtrage par type** (Feu, Eau, Électrik, Psy, Plante, Roche)
- **Filtrage par niveau** (slider min/max)
- **Affichage des favoris uniquement** (toggle)

#### Suggestions intelligentes
- Suggestions en direct dans la barre de recherche
- Combinaison multiple de filtres
- Reset des filtres d'un clic

#### Combinaisons possibles
```
Exemple: "pika" + Type "Électrik" + Level 5-10 + Favoris
→ Affiche tous les Pokémon favoris de type Électrik
   avec "pika" dans le nom entre niveau 5-10
```
---

### 7. 🖼️ Gestion d'Images Optimisée

Cache d'images haute performance:

#### Interceptor HTTP automatique
- **100 images max** en cache (FIFO eviction)
- Détection auto par extension (.jpg, .png, .gif, .webp, .svg)
- Détection automatique des chemins /img/
- Pas de requête réseau pour les images en cache

#### Service optionnel ImageCacheService
- **50 MB de limite** par blob
- Méthode `preloadImages()` pour charger en batch
- Affichage des stats de cache (débogage)
- Méthode `clearCache()` pour vider manuellement

#### CachedImagePipe
- Utilisation: `<img [src]="url | cachedImage">`
- Déduplication des requêtes concurrentes
- Share replay pour les observables

#### Avantages
- ✅ Réduction du trafic réseau
- ✅ Chargement plus rapide
- ✅ Expérience fluide
- ✅ Économie de bande passante

---

## 📚 Vérification des Requirements

La documentation complète des requirements est disponible dans: **[REQUIREMENTS_VERIFICATION.md](./REQUIREMENTS_VERIFICATION.md)**

Ce fichier détaille:

### ✅ Critères Angular implémentés

| Critère | Requirement | Implémenté | Détail |
|---------|------------|-----------|--------|
| 🔐 Authentification | Requise | ✅ Oui | Login, Register, AuthGuard |
| 📱 Inscription | Requise | ✅ Oui | Formulaire réactif + validation |
| 🗺️ Routing | Min: 3 | ✅ 7 routes | Protégé + paramètres |
| 🧩 Composants | Min: 1/page | ✅ 11 composants | Réutilisables |
| 🔄 Composant réutilisé | 2+ fois | ✅ Logo (4x) | Home, Login, Register, Pokedex |
| 📤 @Input | Min: 1 | ✅ 9 inputs | Multiples composants |
| 📨 @Output | Min: 1 | ✅ 1 output | DetailEvolutionComponent |
| 🔧 Services | Min: 2 | ✅ 6 services | Auth, Pokedex, Cache, Export, etc |
| 🌐 HTTP | Requise | ✅ Oui | HttpClient complète |
| 💾 Tables DB | Min: 3 | ✅ 4 tables | users, types, creatures, evolution_lines |
| 📝 Reactive Forms | Min: 3 fields | ✅ 7 fields | Login, Register, Pokemon Form |
| ✔️ Custom Validator | Min: 1 | ✅ 2 validators | nameUniqueValidator (async) |
| 🔄 Custom Pipe | Min: 1 | ✅ 1 pipe | PokemonNamePipe |
| 📍 Custom Directive | Min: 1 | ✅ 1 directive | FavoriteStar |

---

## 📖 Documentation détaillée des fonctionnalités

### 🎯 Page d'accueil (Home)
- Présentation de l'application
- Boutons Login/Register
- Call-to-action clear

### 🔐 Authentification (Login/Register)
**Files**:
- `src/app/auth/login/login.ts`
- `src/app/auth/register/register.ts`
- `src/app/auth/auth.service.ts`

**Fonctionnalités**:
- **Login**: Connexion avec username/password
- **Register**: Création de compte avec validation
  - Username minimum 3 caractères
  - Password minimum 6 caractères
  - Confirmation password
- Gestion d'erreurs avec messages clairs
- Redirection automatique après succès
- Session persistée dans localStorage

### 📱 Page Pokédex (Protégée par AuthGuard)
**File**: `src/app/pokedex/pages/list/list.ts`

**Fonctionnalités**:
- Liste de tous les Pokémon de l'utilisateur
- Affichage des stats principales (Nom, Type, Level)
- Navigation vers détails au clic
- Mode Collector toggle
- Barre sticky avec filtres

### 🔍 Page Détails (Detail Component)
**File**: `src/app/pokedex/pages/detail/detail.ts`

**Contenu**:
- **Image agrandie** du Pokémon avec blur background
- **Statistiques** détaillées (Level, HP, ATK, Type)
- **Section d'entraînement** interactive
- **Indicateur de progression** vers niveau suivant
- **Floating Action Buttons**:
  - ⭐ Toggle Favori
  - ✏️ Éditer le Pokémon
  - 🗑️ Supprimer le Pokémon
- **Section Évolution** avec modal animée
- **Faiblesses du type** affichées en badges
- **Animations fluides** (level up, évolution)

### ✏️ Formulaire de Création/Édition
**File**: `src/app/pokedex/pages/form/form.ts`

**7 FormControls**:
1. ✅ **Nom** (text) - Validé unique (async validator)
2. ✅ **Type** (select) - Sélecteur dropdown
3. ✅ **Ligne d'évolution** (select) - Sélecteur modal
4. ✅ **HP** (number) - Points de vie
5. ✅ **Attaque** (number) - Stat d'attaque
6. ✅ **Niveau** (number) - Niveau initial (défaut 1)
7. ✅ **Image URL** (text) - URL vers l'image

**Modes**:
- **CREATE**: Tous les champs éditables, validation complète
- **EDIT**: Seul le nom peut être modifié, autres désactivés

**Validation réactive**:
- Unique name validator (HTTP call)
- Required fields
- Number ranges
- URL format check

**Modal de sélection d'évolution**:
- Grille de cartes pour chaque ligne d'évolution
- Sélection animée
- Affichage des stades

---

## 🛠️ Commandes disponibles

### Développement
```bash
# Lancer l'app en dev (localhost:4200)
npm start

# Lancer le serveur json-server (localhost:3000)
npm run server

# Exécuter les deux ensemble (recommandé):
# Terminal 1: npm start
# Terminal 2: npm run server
```
---

## 🎯 Résumé des features uniques

| Feature | Description | Déclencheur |
|---------|-------------|------------|
| 🎮 **Entraînement dynamique** | 10 clics = 1 niveau, stats augmentent | Page détail → Bouton 💪 |
| 🔄 **Évolution auto** | Change image au niveau requis | Niveau 5 & 10 |
| ⭐ **Système de favoris** | Filtrage et badge visuel | Clic sur l'étoile |
| 🎨 **Mode Collector** | Fonds thématiques par type | Toggle 🎨 |
| 📥 **Export PNG** | Génère carte avec stats | Clic sur 📥 |
| 🔍 **Cache d'images** | 100 images max, FIFO evict | Automatique |
| 🔐 **Auth complète** | Login, Register, Guard | Page login |
| 📊 **Validation async** | Unique name check | Formulaire |
