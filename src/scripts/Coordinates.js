import Phaser from 'phaser'

export default class Coordinates {
	constructor(scene) {
		this.scene = scene;

		//Registrate on Game
		this.scene.coordinates = this;

		this.create();
	}

	create() {
		this.origin = new Phaser.Geom.Point(0, 0);
	}

	getDistanceFromOrigin(point) {
		return Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2));
	}
}