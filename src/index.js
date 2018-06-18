import Phaser from 'phaser'

import BootScene from 'scenes/BootScene';
import GameScene from 'scenes/GameScene.js';

var config = {
	type: Phaser.AUTO,
	debug: true,
	parent: 'app',
	title: 'RTSLight',
	version: "0.1.0",
	width: document.documentElement.clientWidth,
	height: document.documentElement.clientHeight,
	physics: {
		default: 'matter',
		matter: {
			debug: true,
			/*
			world: {
				gravity: {
					x: 0,
					y: 0,
					scale: 0.001,
				},
			},
			*/
		},
	},
	scene: [
		BootScene,
		GameScene,
	],
	fps: 30,
	transparent: true,
}

window.game = new Phaser.Game(config);

function resizeApp()
{
	var div = document.getElementById('app');
	
	div.style.width = window.innerWidth;
	div.style.height = window.innerHeight;
}
		
window.addEventListener('resize', function(e)
{
	resizeApp();
});