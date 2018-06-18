import Phaser from 'phaser';
import EasyStar from 'easystarjs';

import Ground from '../sprites/ground';

export default class IsometricTilemap {
	constructor({ scene, map }) {
		this.scene = scene;
		this.sys = scene.sys;
		this.input = scene.input;
		this.cameras = scene.cameras;

		this.debug = false;
		this.map = map;
		this.scale = 0.5;
		this.gameCenter = new Phaser.Geom.Point(this.sys.game.config.width / 2, this.sys.game.config.height / 2);

		//Start Path Planning
		this.scene.easystar = new EasyStar.js();

		this.create();
	}

	create() {
		//Start Path Planning for Map
		this.scene.easystar.setGrid(
			this.convertMapToEasyStar(
				this.map.layers[0].data,
				this.map.layers[0].width
			)
		);
		this.scene.easystar.setAcceptableTiles([ 1 ]);

		//Render Map
		this.renderMap(this.map, 100);

		/*
		this.scene.cameras.main.scrollY -= 100;
		this.scene.cameras.main.scrollX -= 100;

		let point1 = new Phaser.Geom.Point(62.5, 0);
		let point2 = this.cartesianToIsometric(point1);

		new Ground({
			scene: this.scene,
			x: 0, y: 0,
			key: 'grass',
		});
		new Ground({
			scene: this.scene,
			x: point2.x, y: point2.y,
			key: 'grass',
		});

		console.log(point1, point2);
		*/
	}

	update() {
		//this.renderPoint = this.findRenderPoint(this.map.layers[0]);

		if(this.input.activePointer.isDown) {
			let clickedTile = this.getTile(
				this.input.activePointer.worldX,
				this.input.activePointer.worldY
			);

			console.log('Clicked Tile: ', clickedTile);
		}
	}

	getPosition(x, y) {
		let point = new Phaser.Geom.Point(
			x * this.map.tilewidth / 2 * this.scale,
			y * this.map.tileheight * this.scale
		);
		point = this.cartesianToIsometric(point);

		return new Phaser.Geom.Point(
			this.renderPoint.x + point.x,
			this.renderPoint.y + point.y
		);
	}

	getTile(x, y) {
		let point = new Phaser.Geom.Point(
			x - this.renderPoint.x,
			y - this.renderPoint.y,
		);
		point = this.isometricToCartesian(point);

		return new Phaser.Geom.Point(
			Math.floor(point.x / (this.map.tilewidth * this.scale / 2 ) + 0.5),
			Math.floor(point.y / (this.map.tileheight * this.scale) + 0.5)
		);
	}

	renderMap(data) {
		for(var i = 0; i < data.layers.length; i++)
			this.drawLayer(data)
	}

	drawLayer(data) {
		this.renderPoint = this.findRenderPoint(data.layers[0]);

		let dataIndex = 0;
		for(var i = 0; i < data.height; i++)
			for(var j = 0; j < data.width; j++) {
				this.drawTile(data.tilesets[data.layers[0].data[dataIndex] - 1].name, j, i);
				dataIndex++;
			}
	}

	drawTile(tiletype, x, y) {
		let tileWidth = this.map.tilewidth * this.scale / 2;
		let tileHeight = this.map.tileheight * this.scale;

		let drawPoint = new Phaser.Geom.Point(
			x * tileWidth,
			y * tileHeight
		);
		drawPoint = this.cartesianToIsometric(drawPoint);

		return new Ground({
			scene: this.scene,
			key: tiletype,
			x: this.renderPoint.x + drawPoint.x,
			y: this.renderPoint.y + drawPoint.y,
		});
	}

	findRenderPoint(layer) {
		let offsetX = (layer.x) * this.scale;
		let offsetY = (this.map.tileheight * layer.height / 2 + layer.y) * this.scale;

		if(false) {
			console.log('game center:', this.gameCenter);
			console.log('offset:', offsetX, offsetY);
			console.log('mapsize:', this.map.tilewidth * layer.width, this.map.tileheight * layer.height);
		}

		return new Phaser.Geom.Point(this.gameCenter.x - offsetX, this.gameCenter.y - offsetY);
	}

	convertMapToEasyStar(array, size) {
		return array.reduce((rows, key, index) => 
			(index % size == 0 ? rows.push([key]) : rows[rows.length-1].push(key)) && rows, []
		);
	}

	cartesianToIsometric(cartPt) {
		return new Phaser.Geom.Point(
			(cartPt.x - cartPt.y),
			(cartPt.x + cartPt.y) / 2
		);
	}

	isometricToCartesian(isoPt){
	    return new Phaser.Geom.Point(
	    	(2 * isoPt.y + isoPt.x) / 2,
	    	(2 * isoPt.y - isoPt.x) / 2
    	);
	}
}