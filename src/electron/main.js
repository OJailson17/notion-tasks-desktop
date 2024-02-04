require('dotenv').config();
const { app, globalShortcut, Menu } = require('electron');
const { createWindow } = require('./createWindow.js');
const { createTray } = require('./tray.js');
const { controlWindow } = require('./controlWindow.js');

const App = () => {
	const win = createWindow();
	const tray = createTray();

	// Check if another instance of the application is already running
	const gotSingleInstanceLock = app.requestSingleInstanceLock();

	if (!gotSingleInstanceLock) {
		app.quit();
	} else {
		app.on('second-instance', () => {
			// When a second instance is launched, focus on the existing instance
			if (win) {
				if (win.isMinimized()) win.restore();
				win.focus();
			}
		});
	}

	const { toggle } = controlWindow(win, tray);

	// Show the main window when the tray icon is clicked
	tray.on('click', toggle);

	// Create a context menu to close the application
	const contextMenu = Menu.buildFromTemplate([
		{
			label: 'Quit',
			type: 'normal',
			role: 'quit',
		},
	]);

	tray.setContextMenu(contextMenu);

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
