# quiz-deutsch-lernen

Petits quiz web pour réviser l'allemand au collège. Pages statiques (HTML, CSS et JS inline), sans build ni dépendance.

- `index.html` : page d'accueil, liste des quiz.
- [`unregelmaessige-verben/`](unregelmaessige-verben/) : verbes irréguliers (*unregelmäßige Verben*). Détails dans son README.
- [`wortschatz/`](wortschatz/) : vocabulaire du cahier, par thème. Détails dans son README.
- `commun/` : ce qui est partagé par toutes les pages : le cadeau de fin de quiz (`cadeau.js`, `cadeau.css` et la liste des vidéos `karambolage.js`) et la neige qui tombe (`neige.js`).

## La neige

`commun/neige.js` fait tomber de la neige sur chaque page qui le charge. Les flocons sont dessinés sur un calque transparent qui ne bloque aucun clic, en bleu glacier sur fond clair et en blanc sur fond sombre. Elle est désactivée par défaut : un bouton ❄️ en bas à droite la lance ou l'arrête, et le choix est mémorisé dans le navigateur. Elle se met en pause quand l'onglet est caché. Pour la retirer du site, il suffit d'enlever la ligne `<script src="…/commun/neige.js"></script>` en bas de chaque page.

Pour tester en local :

```bash
python3 -m http.server
```

puis ouvrir http://localhost:8000.

En ligne : https://nicht.dume.me (GitHub Pages, domaine déclaré dans le fichier `CNAME`).

## Ajouter un quiz

Créer un dossier (nom en ASCII, sans tréma ni ß, pour des URL propres), y mettre son `index.html` avec un lien `../` vers l'accueil, puis ajouter une carte dans la liste `.quizzes` de `index.html`. Pour offrir le cadeau, charger `../commun/cadeau.css`, `../commun/karambolage.js` et `../commun/cadeau.js`, puis appeler `cadeau(element, justes, total, "mots")` sur l'écran de fin. Pour la neige, ajouter `<script src="../commun/neige.js"></script>` juste avant `</body>`.
