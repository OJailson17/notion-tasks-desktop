import('electron').then((ipcRenderer, contextBridge) => {
	contextBridge.exposeInMainWorld('electron', {
		ipcRenderer: {
			send: (channel, data) => ipcRenderer.send('channel', 'message'),
			on: (channel, func) => ipcRenderer.on('channel', func),
		},
	});
});
