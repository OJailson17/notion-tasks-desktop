import { Tray, nativeImage } from 'electron';

export const createTray = () => {
	const icon = nativeImage.createFromPath('assets/icon.png');
	const tray = new Tray(icon);

	tray.setToolTip('Electron Test Application');

	return tray;
};
