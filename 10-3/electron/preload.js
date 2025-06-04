const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld("electron", {
  sendMessage: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  onMessage: (channel, callback) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
  setAlwaysOnTop: (value) => {
    ipcRenderer.send('set-always-on-top', value);
  },
  focusWindow: () => {
    ipcRenderer.send('focus-window');
  }
});
