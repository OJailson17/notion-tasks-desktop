import { BrowserWindow, ipcMain, app } from 'electron';
import path from 'node:path';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// Settings object
let settings = {
	renderer: {
		key1: 'value1',
		key2: 'value2',
	},
};

export const createWindow = () => {
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
			preload: `${app.getAppPath()}\\src\\electron\\preload.js`,
		},
	});

	console.log(`${app.getAppPath()}\\src\\electron\\preload.js`);

	win.loadFile('src/index.html');
	// .then(() => {
	// 	win.webContents.send('sendSettings', settings.renderer);
	// });

	ipcMain.on('request-data', (event, arg) => {
		// arg is optional data sent from the renderer process
		// This could be a request for specific data

		// Prepare the data. This could be an object, an array, a string, etc.
		const data = prepareData();

		// Send data back to the renderer process
		event.sender.send('response-data', 'data');
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
