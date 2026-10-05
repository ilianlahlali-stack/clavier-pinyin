# 拼 Clavier Pinyin

🇬🇧 [English version](README.md)

Un petit clavier flottant pour taper les tons du pinyin (ā á ǎ à, ē é ě è, … ǖ ǘ ǚ ǜ).
Il reste toujours au premier plan : tu écris normalement avec ton clavier, et tu cliques
sur la lettre accentuée quand tu en as besoin — elle s'insère directement dans ton texte.

## ⬇️ Télécharger

| Système | Lien |
|---|---|
| 🍎 **Mac** (Intel et Apple Silicon) | [Clavier-Pinyin-Mac.dmg](https://github.com/ilianlahlali-stack/clavier-pinyin/releases/latest/download/Clavier-Pinyin-Mac.dmg) |
| 🪟 **Windows** 10 / 11 | [Clavier-Pinyin-Windows.exe](https://github.com/ilianlahlali-stack/clavier-pinyin/releases/latest/download/Clavier-Pinyin-Windows.exe) |
| 🐧 **Linux** | [Clavier-Pinyin-Linux.AppImage](https://github.com/ilianlahlali-stack/clavier-pinyin/releases/latest/download/Clavier-Pinyin-Linux.AppImage) |

## 🍎 Installation sur Mac

1. Ouvre le fichier `.dmg` et glisse **Clavier Pinyin** dans le dossier **Applications**.
2. Lance l'app. macOS va la bloquer (« impossible de vérifier le développeur ») — c'est normal,
   l'app n'est pas payée chez Apple. Va dans **Réglages Système → Confidentialité et sécurité**,
   descends en bas et clique **Ouvrir quand même**.
3. Autorise l'app dans **Réglages Système → Confidentialité et sécurité → Accessibilité**
   (sinon cliquer sur les lettres ne fait rien), puis relance l'app.

### 🔴 Le clavier affiche un bandeau rouge / rien ne s'écrit ?

L'app a besoin de l'autorisation **Accessibilité** pour pouvoir « taper » à ta place.
Si un bandeau rouge apparaît en bas du clavier, clique dessus : il ouvre directement le bon réglage.

⚠️ Si « Clavier Pinyin » est **déjà dans la liste et activé** mais que ça ne marche pas
(typiquement après une mise à jour) : macOS se souvient de l'**ancienne** version.
Activer/désactiver l'interrupteur ne suffit pas, il faut :

1. Sélectionner la ligne **Clavier Pinyin** et cliquer sur **−** pour la supprimer.
2. Cliquer sur **+** → **Applications** → **Clavier Pinyin**, et vérifier que l'interrupteur est activé.
3. Quitter le clavier (bouton **×**) et le relancer.

## 🪟 Installation sur Windows

1. Lance `Clavier-Pinyin-Windows.exe`.
2. Si Windows affiche « Windows a protégé votre ordinateur », clique **Informations complémentaires**
   puis **Exécuter quand même**.
3. L'app s'installe et s'ouvre toute seule. Un raccourci est créé sur le bureau.

## 🐧 Linux

Rends le fichier exécutable (`chmod +x Clavier-Pinyin-Linux.AppImage`) puis lance-le.
Nécessite `xdotool` (`sudo apt install xdotool`) et une session X11.

## Utilisation

- **Déplacer** : attrape la barre du haut (拼音).
- **Taille** : boutons **−** / **+**.
- **Majuscules** : bouton **⇧** (Ā Á Ǎ À…).
- **Quitter** : bouton **×**.

Les caractères insérés sont les vrais caractères Unicode du pinyin : ils sont reconnus
par les exercices en ligne, Word, Google Docs, etc.

---

### Pour les développeurs

```bash
npm install
npm start          # lancer en mode dev
npm run dist       # construire l'installeur pour ton système
```

Publier une nouvelle version : changer `version` dans `package.json`, puis
`git tag v1.0.1 && git push --tags` — GitHub Actions compile Mac, Windows et Linux
et met à jour les liens de téléchargement ci-dessus.
