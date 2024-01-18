import { BrowserWindow } from 'electron';
import path from 'node:path';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

export const createWindow = () => {
	const win = new BrowserWindow({
		width: 300,
		height: 310,
		frame: false,
		resizable: false,
		fullscreenable: false,
		show: false,
		webPreferences: {
			// nodeIntegration: true,
			preload: path.resolve(__dirname, 'preload.js'),
		},
	});

	win.loadFile('index.html');
	// win.webContents.loadURL('https://tourmaline-fudge-b6a11d.netlify.app');

	// Intercept the window close event
	win.on('close', event => {
		if (!app.isQuiting) {
			event.preventDefault();
			win.hide();
		}
	});

	return win;
};
