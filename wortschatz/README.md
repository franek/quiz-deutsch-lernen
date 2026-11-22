# Vocabulaire – der Wortschatz

Page web d'entraînement au vocabulaire allemand, pour un élève de collège. Elle reprend les mots de son cahier (classe de 6e3), soit 84 mots ou expressions, rangés par thème.

## Utilisation

Tout tient dans `index.html` (HTML, CSS et JS inline, sans build ni dépendance), plus le cadeau de fin de quiz, commun à tous les quiz, dans `../commun/`. Pour l'utiliser, servir le dépôt en local depuis sa racine :

```bash
python3 -m http.server
```

puis ouvrir http://localhost:8000/wortschatz/.

## Fonctionnement

L'élève choisit un thème (ou tout le vocabulaire), puis l'exercice :

- **De l'allemand au français** : le mot allemand est donné, il faut choisir sa traduction parmi quatre. Les mauvaises réponses proposées viennent du même thème. On peut répondre au clavier avec les touches 1 à 4.
- **Du français à l'allemand** : le mot français est donné, il faut l'écrire en allemand, avec l'article pour les noms.

Les mots sont tirés au hasard. Un mot raté revient en fin de file jusqu'à ce qu'il soit juste. Le score final ne compte que les mots réussis du premier coup et liste ceux à revoir. À partir de 80 % de réponses justes du premier coup, une vidéo *Karambolage* est offerte.

Pour voir l'écran de fin sans faire le quiz, ajouter `?apercu` à l'adresse : 10 / 12, avec le cadeau. `?apercu=7` montre 7 / 12, sans le cadeau.

## Thèmes

- 🌊 Au bord de la mer (12 mots)
- 👻 Fantômes et frissons (12)
- 🏠 À la maison (13)
- 🙂 Caractère et humeur (19)
- 🧭 Objets d’aventure (7)
- 🗣️ Verbes et expressions (12)
- 🧩 Et aussi… (9)

## Structure du code

- `THEMES` : thèmes et mots. Chaque mot contient `de` (forme allemande, ou liste de formes acceptées), `fr` (traduction), et optionnellement `pl` (pluriel, affiché pour information), `note` (remarque affichée après la réponse et dans la liste) et `casse: true` (la majuscule compte).
- `WORDS` : liste à plat des mots, chacun relié à son thème.
- `SERIES` : séries proposées, une par thème plus « Tout ».
- `compare()` et `checkWritten()` : correction de l'écrit.

## Choix faits

- **Source des données** : mots recopiés du cahier de l'élève, dans leur orthographe correcte (*Gespenst*, *Mond*, *Felsen*, *Schrecken*…). Les photos du cahier (et le zip qui les a apportées) ne sont pas versionnées (`.gitignore`). Traductions ajoutées quand le cahier n'en donnait pas : *der Wind heult* (le vent hurle), *es geistert* (il y a des fantômes), *grübeln* (ruminer, se creuser la tête ; le cahier l'explique en allemand par *viel nachdenken*).
- **Deux sens, deux façons de répondre** : allemand → français en choix multiple, parce qu'une traduction française tapée a trop de variantes pour être corrigée de façon fiable ; français → allemand à écrire, pour travailler l'orthographe et les articles.
- **Correction de l'écrit** :
  - un article manquant ou faux est signalé comme tel (« Il manque l'article », « Mauvais article ») ;
  - une réponse juste à un tréma ou un ß près est comptée fausse avec un message « Presque ! » ;
  - une majuscule oubliée sur un nom est acceptée, avec un rappel. Exception : *Sie* (vous), où la majuscule change le sens ;
  - quand plusieurs formes sont acceptées (*das Meer / die See*, *gleich / sofort*…), une seule suffit, mais on peut aussi les écrire toutes.
- **Corrections du cahier** : *die Steinschleuder* (le lance-pierre) est féminin, alors que le cahier écrit « der ». *saufen* est traduit par « se soûler ».
- **Pièges signalés** : *die See* (la mer) / *der See* (le lac), *zahlen* (payer) / *zählen* (compter), *spuken* (hanter) / *spucken* (cracher).
- **Doublons de sens fusionnés** : *es spukt* et *es geistert* (il y a des fantômes) forment un seul mot, avec les deux réponses acceptées.

## Ajouter des mots

Ajouter les entrées dans le thème voulu de `THEMES`, ou créer un nouveau thème (`id`, `name` avec un emoji, `words`). Les séries, la liste de révision et les compteurs se mettent à jour seuls. Vérifier `noUml()` : comme pour les verbes, la fonction ramène « ae », « oe » et « ue » à a, o, u, ce qui pourrait fausser le message « Presque ! » pour un mot qui contient naturellement ces lettres.
