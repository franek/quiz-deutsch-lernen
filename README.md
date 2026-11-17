# quiz-deutsch-lernen

Petits quiz web pour réviser l'allemand au collège. Pages statiques (HTML, CSS et JS inline), sans build ni dépendance.

- `index.html` : page d'accueil, liste des quiz.
- [`unregelmaessige-verben/`](unregelmaessige-verben/) : verbes irréguliers (*unregelmäßige Verben*). Détails dans son README.
- [`vocabulaire/`](vocabulaire/) : vocabulaire du cahier, par thème. Détails dans son README.
- `commun/` : le cadeau de fin de quiz, partagé par tous les quiz (`cadeau.js`, `cadeau.css` et la liste des vidéos `karambolage.js`).

Pour tester en local :

```bash
python3 -m http.server
```

puis ouvrir http://localhost:8000.

En ligne : https://nicht.dume.me (GitHub Pages, domaine déclaré dans le fichier `CNAME`).

## Ajouter un quiz

Créer un dossier (nom en ASCII, sans tréma ni ß, pour des URL propres), y mettre son `index.html` avec un lien `../` vers l'accueil, puis ajouter une carte dans la liste `.quizzes` de `index.html`. Pour offrir le cadeau, charger `../commun/cadeau.css`, `../commun/karambolage.js` et `../commun/cadeau.js`, puis appeler `cadeau(element, justes, total, "mots")` sur l'écran de fin.
