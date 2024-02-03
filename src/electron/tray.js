const { Tray, nativeImage } = require('electron');

function createTray() {
	const icon = nativeImage.createFromPath('./resources/assets/icon.png');
	const tray = new Tray(icon);

	tray.setToolTip('Notion Tasks');

	return tray;
}

module.exports = { createTray };
