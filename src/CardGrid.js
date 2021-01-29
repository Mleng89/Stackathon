import CardBase from './CardBase.js';

export default class CardGrid extends CardBase {
	constructor(data) {
		let { value, type } = data;
		super(data);
		this.textValue = new Phaser.GameObjects.BitmapText(
			this.scene,
			0,
			-115,
			'pressstart',
			value
		);
		this.add(this.textValue);
		this.value = value;
		this.cardtype = type;
	}
	//Health value text
	set value(newValue) {
		this._value = newValue;
		this.textValue.text = this._value;
		this.textValue.x = 50 - this.textValue.width / 2;
		this.textValue.tint = 240;
	}
	get value() {
		return this._value;
	}

	set highlighted(highlight) {
		if (highlight) {
			let color = 0xcccc88;
			this.spriteCard.tint = color;
			this.spriteImage.tint = color;
		} else {
			this.spriteCard.tint = 0xffffff;
			this.spriteImage.tint = 0xffffff;
		}
	}
}
