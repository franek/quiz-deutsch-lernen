# quiz-deutsch-lernen

Petits quiz web pour réviser l'allemand au collège. Pages statiques (HTML, CSS et JS inline), sans build ni dépendance.

- `index.html` : page d'accueil, liste des quiz.
- [`unregelmaessige-verben/`](unregelmaessige-verben/) : verbes irréguliers (*unregelmäßige Verben*). Détails dans son README.

Pour tester en local :

```bash
python3 -m http.server
```

puis ouvrir http://localhost:8000.

## Ajouter un quiz

Créer un dossier (nom en ASCII, sans tréma ni ß, pour des URL propres), y mettre son `index.html` avec un lien `../` vers l'accueil, puis ajouter une carte dans la liste `.quizzes` de `index.html`.
