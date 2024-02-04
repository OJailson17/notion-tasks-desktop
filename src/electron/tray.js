const { Tray, nativeImage } = require('electron');

function createTray() {
	const iconPath =
		process.env.NODE_ENV && process.env.NODE_ENV === 'dev'
			? 'assets/icon.png'
			: './resources/assets/icon.png';
	const icon = nativeImage.createFromPath(iconPath);
	const tray = new Tray(icon);

	tray.setToolTip('Notion Tasks');

	return tray;
}

module.exports = { createTray };
