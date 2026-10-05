const { app, BrowserWindow, ipcMain, clipboard, systemPreferences } = require('electron');
const { execFile, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const isMac = process.platform === 'darwin';
const isWin = process.platform === 'win32';

const BOUNDS_FILE = path.join(app.getPath('userData'), 'bounds.json');
const RATIO = 300 / 340;

let win;

function loadBounds() {
  try { return JSON.parse(fs.readFileSync(BOUNDS_FILE, 'utf8')); }
  catch { return { width: 300, height: 340 }; }
}

function saveBounds() {
  try { fs.writeFileSync(BOUNDS_FILE, JSON.stringify(win.getBounds())); } catch {}
}

function createWindow() {
  win = new BrowserWindow({
    ...loadBounds(),
    minWidth: 150,
    minHeight: 170,
    ...(isMac && {
      type: 'panel',          // NSPanel non-activant : cliquer ne vole pas le focus
      vibrancy: 'hud',
      visualEffectState: 'active',
    }),
    focusable: false,         // ne devient jamais la fenêtre active → le collage va à l'app d'en dessous
    acceptFirstMouse: true,   // les clics fonctionnent même sans focus
    frame: false,
    transparent: true,
    roundedCorners: true,
    hasShadow: true,
    alwaysOnTop: true,
    resizable: true,
    fullscreenable: false,
    skipTaskbar: true,
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.setAlwaysOnTop(true, 'screen-saver');
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  win.setAspectRatio(RATIO);
  win.loadFile('index.html');

  win.on('moved', saveBounds);
  win.on('resized', saveBounds);
}

// --- Simulation du raccourci « coller » selon le système ---

// Windows : un PowerShell reste ouvert en arrière-plan (le lancer à chaque clic serait trop lent)
let psPaster;
function getWinPaster() {
  if (psPaster && !psPaster.killed) return psPaster;
  psPaster = spawn('powershell.exe', [
    '-NoProfile', '-NoLogo', '-WindowStyle', 'Hidden', '-Command',
    'Add-Type -AssemblyName System.Windows.Forms; ' +
    'while (($l = [Console]::In.ReadLine()) -ne $null) { [System.Windows.Forms.SendKeys]::SendWait("^v") }',
  ], { windowsHide: true });
  psPaster.on('exit', () => { psPaster = null; });
  return psPaster;
}

function sendPaste(done) {
  if (isMac) {
    execFile('osascript', ['-e', 'tell application "System Events" to keystroke "v" using command down'], done);
  } else if (isWin) {
    getWinPaster().stdin.write('\n');
    setTimeout(done, 150);
  } else {
    execFile('xdotool', ['key', '--clearmodifiers', 'ctrl+v'], done);
  }
}

// Insère le caractère dans l'app qui a le focus : presse-papier + coller, puis restauration.
ipcMain.on('type-char', (_e, ch) => {
  const previous = clipboard.readText();
  clipboard.writeText(ch);
  sendPaste((err) => {
    if (err) console.error('[pinyin] collage échoué :', err.message);
    setTimeout(() => clipboard.writeText(previous), 250);
  });
});

ipcMain.on('resize-by', (_e, factor) => {
  const b = win.getBounds();
  const width = Math.max(150, Math.round(b.width * factor));
  win.setBounds({ x: b.x, y: b.y, width, height: Math.round(width / RATIO) });
  saveBounds();
});

ipcMain.on('quit', () => app.quit());

app.whenReady().then(() => {
  if (isMac) {
    app.dock.hide();
    // Demande l'autorisation d'Accessibilité (nécessaire pour simuler ⌘V)
    systemPreferences.isTrustedAccessibilityClient(true);
  }
  if (isWin) getWinPaster(); // pré-chauffe PowerShell
  createWindow();
});

app.on('window-all-closed', () => app.quit());
app.on('will-quit', () => { if (psPaster) psPaster.kill(); });
