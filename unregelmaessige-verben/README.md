# Unregelmäßige Verben – verbes irréguliers

Page web d'entraînement aux verbes forts et faibles irréguliers allemands, pour un élève de collège. Elle couvre les 20 premiers verbes de sa fiche de cours, « Verbes forts et verbes faibles irréguliers », de *anfangen* à *fliegen*.

## Utilisation

Tout tient dans `index.html` : HTML, CSS et JS inline, sans build ni dépendance. Pour l'utiliser, on peut l'ouvrir directement dans un navigateur ou le servir en local :

```bash
python3 -m http.server
```

Le seul élément externe est la police Lexend (Google Fonts). Sans connexion, la page se rabat sur la police système.

## Fonctionnement

L'élève choisit d'abord la série (verbes 1 à 10, 11 à 20, ou les 20), puis l'exercice :

- **Les trois formes** : l'infinitif et la traduction sont donnés, il faut écrire le présent (3e pers.), le prétérit et le parfait.
- **À partir du français** : seule la traduction est donnée, il faut écrire l'infinitif et les trois formes.

Les verbes sont tirés au hasard. Un verbe raté revient en fin de file jusqu'à ce qu'il soit juste. Le score final ne compte que les verbes réussis du premier coup, et liste ceux à revoir.

Le pronom « er » est affiché devant les champs. L'élève peut le retaper ou non, les deux sont acceptés.

## Structure du code

- `VERBS` : tableau des verbes. Chaque entrée contient `inf`, `pres`, `pret` et `parf` (sans le « er »), `fr` (traduction), et optionnellement `frHint` (consigne affichée en mode français, quand la traduction est ambiguë) et `star: true` (présent irrégulier).
- `MODES` : champs demandés pour chaque exercice.
- `check(field, value, verb)` : correction d'une réponse.
- `start()` : construit la série (`set`) à partir du choix 1–10 / 11–20 / tout.

## Choix faits

- **Source des données** : formes et traductions recopiées de la fiche de l'élève, astérisques compris, pour coller à ce qu'il apprend en classe.
- **Correction tolérante mais pédagogique** : majuscules et espaces sont ignorés. Une réponse juste à un tréma ou un ß près (ex. « ass » pour « aß », « fangt » pour « fängt ») est comptée fausse, mais avec un message « Presque ! » plutôt qu'une simple erreur. Pour le parfait, le quiz signale spécifiquement un auxiliaire manquant ou erroné (« hat » / « ist »).
- **Présents irréguliers** : les verbes marqués d'un astérisque sur la fiche (`star: true`) affichent un rappel « le présent change de voyelle » après correction.
- **Les deux « commencer »** : *anfangen* et *beginnen* ont la même traduction. En mode français, la consigne précise « verbe à particule séparable » ou « sans particule ».
- **biegen** : gardé avec « ist gebogen » comme sur la fiche, ce qui est correct au sens de « tourner » (dans une rue). Au sens de « plier », c'est « hat gebogen ».
- **Clavier** : boutons ä, ö, ü, ß pour la saisie sur téléphone. Ils insèrent le caractère dans le champ actif sans lui faire perdre le focus.
- **Couleurs** : chaque champ reprend la couleur de surligneur de la fiche (bleu-vert pour l'infinitif, vert pour le présent, jaune pour le prétérit, orange pour le parfait, violet pour la traduction). Thèmes clair et sombre gérés.

## Ajouter des verbes

1. Ajouter les entrées à la fin de `VERBS`, dans l'ordre de la fiche.
2. Mettre à jour le sélecteur de série : les découpages 1–10 et 11–20 sont codés en dur dans `start()` (`all.slice(0, 10)`, `all.slice(10, 20)`) et dans le HTML (`.range`). Prévoir par exemple une série par bloc de 10.
3. Mettre à jour le titre et le texte d'introduction (« les 20 premiers », « de *anfangen* à *fliegen* »).
4. Vérifier `noUml()` : la fonction ramène aussi « ae », « oe » et « ue » à a, o, u pour reconnaître les trémas tapés à l'ancienne. Un nouveau verbe qui contient naturellement « ue » ou « oe » pourrait fausser le message « Presque ! ».
