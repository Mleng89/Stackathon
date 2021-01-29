// import 'phaser';
import CardPlayer from './CardPlayer.js';
import CardDraggable from './CardDraggable.js';
import Grid from './Grid.js';
import { AddButtonRestart } from './ButtonPlay.js';

export default class MainScene extends Phaser.Scene {
	constructor() {
		super('MainScene');
	}
	preload() {
		this.load.image('playercard', 'public/assets/playercard.png');
		this.load.image('card', 'public/assets/card.png');
		this.load.image('armor', 'public/assets/armor.png');
		this.load.image('knight', 'public/assets/knight.png');
		this.load.image('goblin', 'public/assets/goblin.png');
		this.load.image('hellknight', 'public/assets/hellknight.png');
		this.load.image('brainworm', 'public/assets/brainworm.png');
		this.load.image('twoheadedogre', 'public/assets/twoheadedogre.png');
		this.load.image('orcsorcerer', 'public/assets/orc_sorcerer.png');
		this.load.image('orbofeyes', 'public/assets/orb_of_eyes.png');
		this.load.image('chest', 'public/assets/chest.png');
		this.load.image('potion', 'public/assets/redpot.png');
		this.load.image('shield', 'public/assets/shield.png');
		this.load.image('cloak', 'public/assets/cloak.png');
		this.load.image('buckler', 'public/assets/buckler.png');
		this.load.image('dead', 'public/assets/dead.png');
		this.load.image('play', 'public/assets/play.png');
		this.load.bitmapFont(
			'pressstart',
			'public/assets/pressstart.png',
			'public/assets/pressstart.fnt'
		);
		this.load.audio('hit', 'public/assets/audio/hit.wav');
		this.load.audio('dungeon', 'public/assets/audio/dungeon.wav');
	}
	create() {
		this.hitSound = this.sound.add('hit');
		this.background = this.sound.add('dungeon', {
			volume: 0.1,
			loop: true,
		});
		// music = new Phaser.Sound(this.background, 'dungeon', 1, true);
		// music.play();
		this.background.play();
		this.grid = new Grid({ scene: this, columns: 3, rows: 3 });
		this.player = new CardPlayer({
			scene: this,
			x: this.game.config.width / 2,
			y: this.game.config.height - 150,
			card: 'playercard',
			image: 'knight',
			health: 20,
			depth: 1,
			ondragend: (pointer, gameObject) => {
				this.player.x = this.player.originalX;
				this.player.y = this.player.originalY;
				if (this.highlighted) {
					this.player.originalX = this.player.x = this.highlighted.x;
					this.highlighted.selected = true;
					switch (this.highlighted.cardtype) {
						case 'attack':
							this.player.attack(this.highlighted.value);
							this.highlighted.dead = true;
							this.highlighted.deadAnimation();
							break;
						case 'heal':
							this.player.health = Math.min(
								this.player.health + this.highlighted.value,
								this.player.maxHealth
							);
							this.highlighted.selected = true;
							break;
						case 'armor':
							this.player.armor = this.player.armor + this.highlighted.value;
							break;
						case 'chest':
							this.player.armor = this.player.armor + 3;
							this.player.health = this.player.health + 5;
					}
					if (this.player.dead) {
						AddButtonRestart(this);
					} else {
						this.grid.fadeFrontRow();
					}
				}
			},
		});
	}
	update(time, delta) {
		this.grid.cards[0].highlighted = false;
		this.grid.cards[1].highlighted = false;
		this.grid.cards[2].highlighted = false;
		this.highlighted = null;
		let columnWidth = this.game.config.width / this.grid.columns;
		let difference = Math.abs(this.player.x - this.player.originalX);
		if (this.player.y < 700 && difference < columnWidth * 1.4) {
			if (this.player.x < columnWidth) {
				this.grid.cards[0].highlighted = true;
				this.highlighted = this.grid.cards[0];
			} else if (this.player.x > columnWidth * 2) {
				this.grid.cards[2].highlighted = true;
				this.highlighted = this.grid.cards[2];
			} else {
				this.grid.cards[1].highlighted = true;
				this.highlighted = this.grid.cards[1];
			}
		}
	}
}
