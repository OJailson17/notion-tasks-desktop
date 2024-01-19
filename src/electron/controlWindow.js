export const controlWindow = (win, tray) => {
	const toggle = () => {
		if (win.isVisible()) {
			win.hide();
		} else {
			show();
		}
	};

	const show = () => {
		const { x, y } = getPosition();

		win.setPosition(x, y, false);
		win.show();
		win.focus();
	};

	const getPosition = () => {
		const winBounds = win.getBounds();
		const trayBounds = tray.getBounds();

		const x = Math.round(
			trayBounds.x + trayBounds.width / 2 - winBounds.width / 2,
		);
		const y = Math.round(trayBounds.y - winBounds.height - 4);

		return { x, y };
	};

	return {
		toggle,
	};
};
