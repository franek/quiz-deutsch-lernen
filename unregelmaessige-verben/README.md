# Unregelmäßige Verben – verbes irréguliers

Page web d'entraînement aux verbes forts et faibles irréguliers allemands, pour un élève de collège. Elle couvre toute sa fiche de cours, « Verbes forts et verbes faibles irréguliers » (pages 130 et 131 du manuel), soit 93 verbes de *anfangen* à *ziehen*, dont *sein*, *werden* et *haben* ajoutés à la main au bas des pages.

## Utilisation

Tout tient dans `index.html` : HTML, CSS et JS inline, sans build ni dépendance. Pour l'utiliser, on peut l'ouvrir directement dans un navigateur ou le servir en local :

```bash
python3 -m http.server
```

Le seul élément externe est la police Lexend (Google Fonts). Sans connexion, la page se rabat sur la police système.

## Fonctionnement

L'élève choisit d'abord la série, puis l'exercice :

- **Séries** : une par tranche de 10 verbes dans l'ordre de la fiche (1 à 10, 11 à 20… 81 à 93 : un reste de moins de 5 verbes est rattaché à la dernière série), toute la fiche, ou 20 verbes tirés au hasard. Le premier et le dernier verbe de la série s'affichent sous les boutons. Le dernier choix est mémorisé dans le navigateur.
- **Les trois formes** : l'infinitif et la traduction sont donnés, il faut écrire le présent (3e pers.), le prétérit et le parfait.
- **À partir du français** : seule la traduction est donnée, il faut écrire l'infinitif et les trois formes.

Les verbes sont tirés au hasard. Un verbe raté revient en fin de file jusqu'à ce qu'il soit juste. Le score final ne compte que les verbes réussis du premier coup, et liste ceux à revoir. Au-delà de 30 verbes, la barre de pastilles est remplacée par un compteur.

À la fin, si au moins 80 % des verbes sont justes du premier coup, un **cadeau** : un épisode de *Karambolage* (ARTE), tiré au hasard dans `GIFTS`. En dessous de 80 %, un message indique combien de verbes il manquait pour l'obtenir. Le lecteur ARTE n'est chargé qu'au clic sur la vignette, et un lien permet de regarder la vidéo sur arte.tv.

Pour voir l'écran de fin sans faire le quiz, ajouter `?apercu` à l'adresse (ex. `https://nicht.dume.me/unregelmaessige-verben/?apercu`) : il s'affiche avec un score d'exemple de 8 / 10, donc avec le cadeau. `?apercu=7` montre 7 / 10, sans le cadeau.

Le pronom (« er », ou « es » pour *gelingen* et *geschehen*) est affiché devant les champs. L'élève peut le retaper ou non, les deux sont acceptés.

## Structure du code

- `VERBS` : tableau des verbes, dans l'ordre de la fiche. Chaque entrée contient `inf`, `pres`, `pret` et `parf` (sans le pronom), `fr` (traduction), et optionnellement :
  - `frHint` : consigne affichée en mode français, quand la traduction est ambiguë ;
  - `star: true` : présent irrégulier (astérisque de la fiche) ;
  - `pron` : pronom, si ce n'est pas « er » ;
  - `alt` : autres réponses acceptées, par champ (ex. `alt: { inf: ["Sport treiben"] }`).
  Un parfait écrit `hat/ist …` accepte les deux auxiliaires.
- `GIFTS` : vidéos offertes en fin de quiz. Chaque entrée contient l'identifiant ARTE (`id`, ex. `133252-007-A`, tiré de l'adresse arte.tv), le titre (`title`) et la vignette (`img`, image `og:image` de la page en 640x360).
- `SERIES` : séries proposées, générées à partir de `VERBS`.
- `MODES` : champs demandés pour chaque exercice.
- `answers(field, verb)` et `check(field, value, verb)` : réponses acceptées et correction.
- `start()` : construit la série (`set`) à partir du choix.

## Choix faits

- **Source des données** : formes et traductions recopiées de la fiche de l'élève, astérisques compris, pour coller à ce qu'il apprend en classe. Les photos de la fiche ne sont pas versionnées (`.gitignore`).
- **Correction tolérante mais pédagogique** : majuscules et espaces sont ignorés. Une réponse juste à un tréma ou un ß près (ex. « ass » pour « aß », « fangt » pour « fängt ») est comptée fausse, mais avec un message « Presque ! » plutôt qu'une simple erreur. Pour le parfait, le quiz signale spécifiquement un auxiliaire manquant ou erroné (« hat » / « ist »).
- **Présents irréguliers** : les verbes marqués d'un astérisque sur la fiche (`star: true`) affichent un rappel « le présent change de voyelle » après correction. *sein*, *werden* et *haben*, écrits à la main, n'en ont pas.
- **Traductions en double** : *anfangen* / *beginnen* (« commencer ») et *laufen* / *rennen* (« courir ») ont une consigne précise en mode français : particule séparable ou non, verbe fort ou prétérit en -te.
- **Cas particuliers de la fiche** :
  - *biegen* : gardé avec « ist gebogen », correct au sens de « tourner » (dans une rue). Au sens de « plier », c'est « hat gebogen ».
  - *treiben (Sport)* : « treibt Sport », « hat Sport getrieben ». En mode français, « treiben », « Sport treiben » et « treiben (Sport) » sont acceptés.
  - *ziehen* : « hat/ist gezogen », les deux auxiliaires sont acceptés (« tirer » / « aller, déménager »).
  - *gelingen*, *geschehen* : verbes impersonnels, conjugués avec « es ».
- **Clavier** : boutons ä, ö, ü, ß pour la saisie sur téléphone. Ils insèrent le caractère dans le champ actif sans lui faire perdre le focus.
- **Couleurs** : chaque champ reprend la couleur de surligneur de la fiche (bleu-vert pour l'infinitif, vert pour le présent, jaune pour le prétérit, orange pour le parfait, violet pour la traduction). Thèmes clair et sombre gérés.
- **Liste de révision** : tableau numéroté sur ordinateur, une fiche par verbe sur téléphone.

## Ajouter des verbes

1. Ajouter les entrées dans `VERBS`, à leur place dans la fiche. Les séries et les textes se mettent à jour seuls.
2. Mettre à jour le texte d'introduction s'il change de premier ou de dernier verbe (« de *anfangen* à *ziehen* »).
3. Vérifier `noUml()` : la fonction ramène aussi « ae », « oe » et « ue » à a, o, u pour reconnaître les trémas tapés à l'ancienne. Un nouveau verbe qui contient naturellement « ue » ou « oe » pourrait fausser le message « Presque ! ».
