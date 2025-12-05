# Déploiement rapide (Vercel) — Nuit Info / NIRD

Ce fichier donne des instructions succinctes pour mettre le site en ligne
rapidement (Vercel) et une checklist pour la Nuit.

1) Préparer le dépôt

- S'assurer que tous les assets (images, icônes) sont libres de droits.
- Indiquer la licence souhaitée (par ex. `CC BY-SA`) dans le `README.md`.
- S'assurer que `package.json` contient les scripts :

```bash
npm install
npm run build
npm run start
```

2) Déployer sur Vercel (méthode la plus rapide)

- Créez un compte sur https://vercel.com/ et connectez votre dépôt GitHub.
- Ajoutez le projet et laissez Vercel détecter Next.js automatiquement.
- Variables d'environnement : aucune nécessaire pour ce site statique.
- Déclenchez un déploiement (push sur la branche connectée) et récupérez l'URL publique.

3) Vérifications avant la nuit

- Lien public fonctionnel (partageable).
- Assets libres et mentions de licence présentes.
- Page `Ressources` accessible et liens externes vérifiés.
- Si vous utilisez des médias lourds (vidéos), préférez héberger sur des plateformes externes (YouTube, Invidious, plateformes éducatives) et intégrez les liens pour ne pas alourdir le build.

4) Commandes utiles locales

```bash
# installer
npm install

# développer localement
npm run dev

# builder pour production
npm run build

# lancer la build locale (test)
npm run start
```

5) Checklist rapide (pour la Nuit)

- [ ] Tous les contenus sont sous licence libre.
- [ ] Page `Ressources` complète et vérifiée.
- [ ] Démo publique accessible via Vercel.
- [ ] Un membre de l'équipe peut expliquer les choix de licences et sources.

Si vous voulez, je peux :
- Ajouter un `README.md` orienté projet NIRD (avec licence et crédits).
- Préparer un `vercel.json` si vous avez des routes spécifiques ou redirections.
