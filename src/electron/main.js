require('dotenv').config();
const { app, globalShortcut } = require('electron');
const { createWindow } = require('./createWindow.js');
const { createTray } = require('./tray.js');
const { controlWindow } = require('./controlWindow.js');

const App = () => {
	const win = createWindow();
	const tray = createTray();

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

app.on('activate', function () {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Quit the application only when explicitly called
app.on('before-quit', () => {
	app.isQuiting = true;
});

app.on('will-quit', () => {
	// Unregister the global shortcut when the app is quitting
	globalShortcut.unregisterAll();
});
