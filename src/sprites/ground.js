import Phaser from 'phaser'

export default class Ground extends Phaser.GameObjects.Sprite {
	constructor({ scene, x, y, key }) {
		super(scene, x, y, key);
		
		this.scene = scene;
		this.scene.add.existing(this);
		this.setScale(0.5);
	}

	update() {
		console.log('deu bom');
	}
}