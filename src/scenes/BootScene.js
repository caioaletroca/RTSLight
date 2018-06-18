import Phaser from 'phaser'

export default class BootScene extends Phaser.Scene {
  constructor(test) {
    super({
        key: 'BootScene'
    });
  }

  init() {
    //this.stage.backgroundColor = '#EDEEC9';
    //this.fontsReady = false
    //this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload() {
  	/*
    if (config.webfonts.length) {
      WebFont.load({
        google: {
          families: config.webfonts
        },
        active: this.fontsLoaded
      })
    }

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
    */
  }

  create() {
    this.scene.start('GameScene');
  }
}