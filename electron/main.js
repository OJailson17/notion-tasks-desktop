import { app, globalShortcut } from 'electron/main';
import { createWindow } from './createWindow.js';
import { createTray } from './tray.js';
import { controlWindow } from './controlWindow.js';

const App = () => {
	const win = createWindow();
	const tray = createTray();

	// win.webContents.openDevTools();

	const { toggle } = controlWindow(win, tray);

	// Show the main window when the tray icon is clicked
	tray.on('click', toggle);

	// Register a global shortcut to open the app
	globalShortcut.register('CommandOrControl+Shift+K', () => {
		toggle(win, tray);
	});
};

app.whenReady().then(App);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// Quit the application only when explicitly called
app.on('before-quit', () => {
	app.isQuiting = true;
});

app.on('will-quit', () => {
	// Unregister the global shortcut when the app is quitting
	globalShortcut.unregisterAll();
});
