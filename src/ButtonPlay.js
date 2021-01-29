export function AddButtonRestart(scene) {
	const restartbutton = scene.add.image(
		scene.game.config.width / 2,
		scene.game.config.height / 2,
		'play'
	);
	restartbutton.depth = 2;
	restartbutton.setInteractive();
	restartbutton.on('pointerover', () => (restartbutton.tint = 0xcccccc));
	restartbutton.on('pointerout', () => (restartbutton.tint = 0xffffff));
	restartbutton.on('pointerdown', () => {
		restartbutton.tint = 0xffffff;
		scene.scene.restart();
		scene.background.stop();
	});
}
