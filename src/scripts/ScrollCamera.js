import Phaser from 'phaser'

export default class ScrollCamera {
	constructor(scene) {
		this.scene = scene;
		this.cameras = scene.sys.scene.cameras;
		this.input = scene.input;
		this.game = scene.game;

		this.scrollVelocity = 10;
		this.zoomVelocity = 0.2;
		this.zoomMax = 4;
		this.zoomMin = 0.3;

		this.create();
	}

	create() {
		//Native Events
		this.input.mouse.target.addEventListener("wheel", function(event) {
			if(event.wheelDeltaY > 0) {
				if(this.cameras.main.zoom < this.zoomMax)
					this.cameras.main.zoom += this.zoomVelocity;
			}
			else {
				if(this.cameras.main.zoom > this.zoomMin)
					this.cameras.main.zoom -= this.zoomVelocity;
			}
		}.bind(this));
	}

	update() {
		//Keyboard Control
		let W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		let S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		let A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		let D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

		if(W.isDown) {
			this.cameras.main.scrollY += this.scrollVelocity;
		}
		else if(S.isDown) {
			this.cameras.main.scrollY -= this.scrollVelocity;
		}
		else if(A.isDown) {
			this.cameras.main.scrollX += this.scrollVelocity;
		}
		else if(D.isDown) {
			this.cameras.main.scrollX -= this.scrollVelocity;
		}

		//Mouse Scroll
		if(this.input.activePointer.isDown) {
			if(this.origDragPoint) {
				this.cameras.main.scrollX += this.origDragPoint.x - this.input.activePointer.position.x;
			    this.cameras.main.scrollY += this.origDragPoint.y - this.input.activePointer.position.y;
			}
			
			this.origDragPoint = this.input.activePointer.position.clone();
		}
		else {
			this.origDragPoint = null;
		}
	}
}