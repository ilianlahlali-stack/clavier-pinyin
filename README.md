# 拼 Clavier Pinyin

🇫🇷 [Version française](README.fr.md)

A tiny floating keyboard for typing pinyin tone marks (ā á ǎ à, ē é ě è, … ǖ ǘ ǚ ǜ).
It always stays on top: keep typing normally with your keyboard, and click the accented
letter whenever you need it — it goes straight into your text. No more copy/pasting.

## ⬇️ Download

| System | Link |
|---|---|
| 🍎 **Mac** (Intel and Apple Silicon) | [Clavier-Pinyin-Mac.dmg](https://github.com/ilianlahlali-stack/clavier-pinyin/releases/latest/download/Clavier-Pinyin-Mac.dmg) |
| 🪟 **Windows** 10 / 11 | [Clavier-Pinyin-Windows.exe](https://github.com/ilianlahlali-stack/clavier-pinyin/releases/latest/download/Clavier-Pinyin-Windows.exe) |
| 🐧 **Linux** | [Clavier-Pinyin-Linux.AppImage](https://github.com/ilianlahlali-stack/clavier-pinyin/releases/latest/download/Clavier-Pinyin-Linux.AppImage) |

💻 Computers only — it doesn't work on phones or tablets.

## 🍎 Installing on Mac

1. Open the `.dmg` file and drag **Clavier Pinyin** into the **Applications** folder.
2. Launch the app. macOS will block it ("Apple could not verify…") — that's normal,
   the app just isn't paid for with Apple. Click **Done** (not "Move to Trash"), then go to
   **System Settings → Privacy & Security**, scroll down and click **Open Anyway**.
3. Allow the app in **System Settings → Privacy & Security → Accessibility**
   (otherwise clicking the letters does nothing), then relaunch the app.

### 🔴 Red banner on the keyboard / nothing gets typed?

The app needs the **Accessibility** permission to "type" for you.
If a red banner shows up at the bottom of the keyboard, click it: it opens the right setting.

⚠️ If "Clavier Pinyin" is **already in the list and switched on** but it still doesn't work
(usually after an update): macOS remembers the **old** version.
Toggling the switch isn't enough, you need to:

1. Select the **Clavier Pinyin** row and click **−** to remove it.
2. Click **+** → **Applications** → **Clavier Pinyin**, and make sure the switch is on.
3. Quit the keyboard (**×** button) and relaunch it.

## 🪟 Installing on Windows

1. Run `Clavier-Pinyin-Windows.exe`.
2. If Windows says "Windows protected your PC", click **More info**
   then **Run anyway**.
3. The app installs and opens by itself. A desktop shortcut is created.

## 🐧 Linux

Make the file executable (`chmod +x Clavier-Pinyin-Linux.AppImage`) and run it.
Requires `xdotool` (`sudo apt install xdotool`) and an X11 session.

## How to use

- **Move**: grab the top bar (拼音).
- **Size**: **−** / **+** buttons.
- **Capitals**: **⇧** button (Ā Á Ǎ À…).
- **Quit**: **×** button.

The inserted characters are the real Unicode pinyin characters: they're accepted
by online exercises, Word, Google Docs, etc.

---

### For developers

```bash
npm install
npm start          # run in dev mode
npm run dist       # build the installer for your system
```

To publish a new version: bump `version` in `package.json`, then
`git tag v1.0.2 && git push --tags` — GitHub Actions builds Mac, Windows and Linux
and updates the download links above.
