const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('kb', {
  platform: process.platform,
  type: (ch) => ipcRenderer.send('type-char', ch),
  resizeBy: (factor) => ipcRenderer.send('resize-by', factor),
  quit: () => ipcRenderer.send('quit'),
  axStatus: () => ipcRenderer.invoke('ax-status'),
  openAxSettings: () => ipcRenderer.send('open-ax-settings'),
});
