import Phaser from 'phaser'

//Scripts
import ScrollCamera from '../scripts/ScrollCamera';
import Coordinates from '../scripts/Coordinates';
import IsometricTilemap from '../scripts/IsometricTilemap';

import Player from '../sprites/player';

export default class GameScene extends Phaser.Scene {
	constructor(test) {
		super({
		    key: 'GameScene',
		});
	}

	preload() {
		//Disable
		//this.input.mouse.manager.disableContextMenu();
		//this.input.mouse.manager.config.disableContextMenu = true;

		console.log('Scene Loaded', this);

		this.load.image('grass', 'assets/grass.png');
		this.load.image('bricks', 'assets/bricks.png');
		this.load.image('player', 'assets/player.png');
		this.load.json('map', 'assets/map.json');
	}

	create() {
		this.loadScripts();

		this.matter.world.disableGravity();

		this.map = this.cache.json.get('map');
		console.log(this.map);

		this.tilemap = new IsometricTilemap({
			scene: this,
			map: this.map,
		});
		this.player = new Player({
			scene: this,
			x: 0,
			y: 0,
			key: 'player',
		});
	}

	loadScripts() {
		this.ScrollCamera = new ScrollCamera(this);
		this.Coordinates = new Coordinates(this);
	}

	update(time, delta) {
		this.ScrollCamera.update();
		this.tilemap.update();

		//Update Sprites
		this.player.update(time, delta);
	}
}