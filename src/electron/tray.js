import { Tray, nativeImage, ipcMain } from 'electron';
import path from 'node:path';
import fs from 'node:fs';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// !FIX tray icon not showing in prod
function createTray() {
	const iconPath = path.join(__dirname, '../../assets');
	const icon = nativeImage.createFromPath(iconPath);
	const tray = new Tray(icon);

	if (fs.existsSync(iconPath)) {
		tray.setToolTip('exist');
	} else {
		tray.setToolTip('it doesnt');
	}

	return tray;
}

export { createTray };
