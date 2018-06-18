import Phaser from 'phaser'

import Vector from '../scripts/Vector.js'

export default class Player extends Phaser.Physics.Matter.Sprite {
	constructor({ scene, x, y, key }) {
		super(scene.matter.world, x, y, key);
		
		console.log(this);

		this.scene = scene;
		this.input = scene.input;
		this.scene.add.existing(this);
		this.setScale(0.1);

		//Moviment System
		this.planning = {
			moving: false,

			path: [],

			//Vectors
			start: new Vector(),
			end: new Vector(),
			distance: 0,

			currentTile: new Phaser.Geom.Point(0, 0),

			speed: 500,
		}

		this.debugCenterPlayer();
	}

	debugCenterPlayer() {
		//Center Player
		let point = this.scene.tilemap.getPosition(7, 7);
		this.x = point.x;
		this.y = point.y;
	}

	update(time, delta) {
		if(this.input.activePointer.isDown) {
			this.planning.currentTile = this.scene.tilemap.getTile(
				this.x,
				this.y
			);
			let clickedTile = this.scene.tilemap.getTile(
				this.input.activePointer.worldX,
				this.input.activePointer.worldY
			);
			
			//Calculate Path
			this.scene.easystar.findPath(this.planning.currentTile.x, this.planning.currentTile.y, clickedTile.x, clickedTile.y, (path) => {
				this.planning.path = path;

				//Remove current position
				this.planning.path.splice(0, 1);

				//Start moving
				this.moveTo(this.planning.path[0].x, this.planning.path[0].y)
			});
			this.scene.easystar.calculate();
		}

		this.moveInterpolation(time, delta);
	}

	//Move Objetc to a determined tile
	moveTo(x, y) {
		//Collect Variables
		this.planning.start = new Vector(this.x, this.y);

		let endPoint = this.scene.tilemap.getPosition(x, y);
		this.planning.end = new Vector(endPoint.x, endPoint.y);

		let pathVector = this.planning.end.subtract(this.planning.start);
		this.planning.distance = pathVector.getLength();
		this.planning.direction = pathVector.normalize();

		//Start Moving Animation
		this.planning.moving = true;
	}

	//Move animation interpolation
	moveInterpolation(time, delta) {
		//Move to another point
		if(this.planning.path.length > 0)
			this.moveTo(this.planning.path[0].x, this.planning.path[0].y);
		//Path Ended
		else
			this.planning.moving = false;

		//Move Animation
		if(this.planning.moving) {
			//Move
			this.x += this.planning.direction.x * this.planning.speed * delta / 1000;
			this.y += this.planning.direction.y * this.planning.speed * delta / 1000;

			//Check if reached position
			if((new Vector(this.x, this.y).subtract(this.planning.start)).getLength() >= this.planning.distance) {
				//Snap to end position
				this.x = this.planning.end.x;
				this.y = this.planning.end.y;
				
				this.planning.path.splice(0, 1);
				this.planning.moving = false;
			}
		}
	}
}