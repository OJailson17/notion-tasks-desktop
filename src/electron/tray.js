import { Tray, nativeImage } from 'electron';

export function createTray() {
	const icon = nativeImage.createFromPath('./resources/assets/icon.png');
	const tray = new Tray(icon);

	tray.setToolTip('Notion Tasks');

	return tray;
}
