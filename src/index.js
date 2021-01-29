import MainScene from './MainScene.js';

const config = {
	width: 1050,
	height: 850,
	backgroundColor: '#3c3b35',
	type: Phaser.AUTO,
	parent: 'phaser-container',
	scene: [MainScene],
	debug: false,
	preload: {
		preload: preload,
		create: create,
	},
};

new Phaser.Game(config);

function preload() {}
function create() {
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;
}
