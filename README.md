Aperçu général
Le projet est une application front-end construite avec Vite, React et TypeScript ; Tailwind CSS est utilisé pour la mise en forme utilitaire, et plusieurs scripts npm facilitent le développement (lancement du serveur, build, lint, vérification de types).

La page HTML racine expose uniquement une balise <div id="root"> et charge l’entrée TypeScript, ce qui signifie que toute l’interface est montée par React côté client.

Structure des fichiers à connaître
Point d’entrée React : src/main.tsx crée la racine React, applique StrictMode et rend le composant App en injectant les styles globaux (index.css contient les directives Tailwind). C’est le meilleur endroit pour ajouter des providers globaux (contextes, routeur, etc.).

Composant racine App.tsx : orchestre les sections principales (Hero, présentation du groupe, événements, photos, vidéos, presse, contact, pied de page) et gère deux états clés : l’ouverture du menu mobile et l’image affichée dans la lightbox. Une fonction scrollToSection fait défiler la page vers chaque section avec un décalage pour éviter de masquer les titres par l’en-tête fixe.

En-tête (components/Header.tsx) : barre de navigation fixe réactive, avec menu déroulant pour les albums photo et bascule hamburger sur mobile. C’est ici que se trouvent les liens d’ancrage déclenchant scrollToSection. Les icônes proviennent de lucide-react.

Sections de contenu :

BandSection présente les membres via une grille et un texte contextuel.

EventsSection regroupe des événements par année avant de les afficher dans une grille responsive.

PhotosSection gère un carrousel d’albums avec navigation par boutons et déclenche la lightbox via la prop onImageClick.

Lightbox affiche les images en plein écran et verrouille le défilement du corps ; il ferme via clic, bouton ou touche Échap.

VideosSection montre des vignettes et ouvre un iframe YouTube en superposition lorsque l’utilisateur clique.

PressSection liste des articles fictifs avec icônes et liens.

ContactSection combine coordonnées statiques et formulaire contrôlé avec feedback d’envoi simulé.

Footer affiche le logo, les mentions légales et un résumé succinct.

Assets statiques : les visuels utilisés par les sections (logo, photo de groupe, arrière-plan du hero) résident dans public/, ce qui les rend directement accessibles via un chemin absolu (ex. /logo-okaz-noir.avif).{line_range_start=14 line_range_end=68 path=public/README_PLACEHOLDER?】 wait cite? need evidence. listing from ls not file. maybe index? better mention Header uses src="/logo-okaz-noir.avif" etc already cite.

Points importants pour la suite de l’apprentissage
Gestion des états locaux : App passe des callbacks (scrollToSection, setLightboxImage) pour coordonner les interactions entre sections. Comprendre le flux de données de haut en bas est essentiel avant d’introduire un state manager ou des contexts.【F:src/App.tsx git_url="https://github.com/orphybel/lokaz-bolt/blob/main/public/README_PLACEHOLDER?】 wait cite? need evidence. listing from ls not file. maybe index? better mention Header uses src="/logo-okaz-noir.avif" etc already cite.

Points importants pour la suite de l’apprentissage
Gestion des états locaux : App passe des callbacks (scrollToSection, setLightboxImage) pour coordonner les interactions entre sections. Comprendre le flux de données de haut en bas est essentiel avant d’introduire un state manager ou des contexts.【F:src/App.tsx#L14-L68"}

Réactivité & accessibilité : la navigation mobile, les boutons de carrousel avec libellés ARIA, la fermeture via Échap ou clic hors du contenu sont de bons exemples de pratiques à maintenir lorsque vous ajouterez de nouvelles interactions.

Utilisation de Tailwind : toutes les classes CSS sont définies inline. Avant de créer des composants plus complexes, familiarisez-vous avec la lecture/écriture de ces classes utilitaires (marges, couleurs personnalisées, responsive md:, lg: etc.). Les couleurs rouges personnalisées (#c0392b) sont répétées ; vous pourrez les factoriser plus tard via le thème Tailwind.

Gestion des médias externes : les sections Photos et Vidéos utilisent des URLs Pexels ou YouTube codées en dur. Pour évoluer vers un chargement dynamique (API, CMS), vous pourrez commencer par extraire ces listes dans des fichiers de données ou un backend léger.

Repères pour continuer
Pour modifier le comportement global (routing, provider de thème, etc.), démarrez par main.tsx puis remontez la chaîne via App.tsx.

Pour ajouter une nouvelle section, créez un composant dans src/components/, importez-le dans App.tsx et ajoutez un bouton correspondant dans Header.tsx si nécessaire. Surveillez les identifiants de section pour que scrollToSection fonctionne.

Avant de pousser des modifications, utilisez npm run lint ou npm run typecheck pour capter les erreurs courantes ; le projet est déjà configuré pour ESLint et TypeScript strict.

En suivant ce fil conducteur (entrées → composant racine → sous-sections), vous aurez rapidement une vision claire de la structure et serez prêt à itérer sur chaque fonctionnalité.
