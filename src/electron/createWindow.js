import { BrowserWindow, app } from 'electron';

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
		},
	});

	win.loadFile('src/index.html');

	// Intercept the window close event
	win.on('close', event => {
		if (!app.isQuiting) {
			event.preventDefault();
			win.hide();
		}
	});

	return win;
};
