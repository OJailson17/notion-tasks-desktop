const { BrowserWindow, app } = require('electron');
const path = require('node:path');

const createWindow = () => {
	const win = new BrowserWindow({
		width: 300,
		height: 310,
		frame: false,
		resizable: false,
		fullscreenable: false,
		show: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: true,
			sandbox: false,
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	win.loadFile('src/index.html');

	// Send environment variables to renderer process
	win.webContents.on('did-finish-load', () => {
		win.webContents.send(
			'env-variables',
			JSON.stringify({ API_BASE_URL: process.env.API_BASE_URL }),
		);
	});

	// Intercept the window close event
	win.on('close', event => {
		if (!app.isQuiting) {
			event.preventDefault();
			win.hide();
		}
	});

	return win;
};

module.exports = { createWindow };
