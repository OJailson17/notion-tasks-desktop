const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
	ipcRenderer: {
		send: (channel, data) => ipcRenderer.send('env-variables', data),
		on: (channel, func) => ipcRenderer.on('env-variables', func),
	},
});
