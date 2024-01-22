import { Tray, nativeImage } from 'electron';
import path from 'node:path';
import fs from 'node:fs';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// !FIX tray icon not showing in prod
function createTray() {
	const iconPath = path.join(__dirname, '../');
	const icon = nativeImage.createFromPath('./assets/icon.png');
	const tray = new Tray(icon);

	console.log(fs.readdirSync('./assets'));

	if (fs.existsSync('./assets/icon.png')) {
		tray.setToolTip('yes');
	} else {
		tray.setToolTip(`no`);
	}

	return tray;
}

export { createTray };
