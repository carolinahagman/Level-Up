import Phaser from 'phaser';
import Background from './assets/BG.png';
import SmallPlatform from './assets/smallplatform.png';
import BigBlock from './assets/bigblock.png';
import Crate from './assets/Crate.png';
import LeftPlatform from './assets/left-platform.png';
import LeftTile from './assets/left-tile.png';
import LongPlatform from './assets/longplatform.png';
import MiddlePlatform from './assets/middleplatform.png';
import RightPlatform from './assets/right-platform.png';
import RightTile from './assets/right-tile.png';
import TwoBlockPlatform from './assets/twoblockplatform.png';

const config = {
  type: Phaser.AUTO, // tries to render in WEBGL , if it fails, it will use Canvas
  width: 1200,
  height: 800,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

let player;
let platforms;

const game = new Phaser.Game(config);

function preload() {
  this.load.image('background', Background);
  this.load.image('smallplatform', SmallPlatform);
  this.load.image('bigblock', BigBlock);
  this.load.image('crate', Crate);
  this.load.image('leftplatform', LeftPlatform);
  this.load.image('longplatform', LongPlatform);
  this.load.image('middleplatform', MiddlePlatform);
  this.load.image('rightplatform', RightPlatform);
  this.load.image('rightile', RightTile);
  this.load.image('twoblockplatform', TwoBlockPlatform);
}

function create() {
  this.add.image(game.config.width / 2, game.config.height / 2, 'background');

  //this.add.image(150, 130, 'smallplatform');
  platforms = this.physics.add.staticGroup();

  platforms.create(400, 200, 'smallplatform').setScale(1).refreshBody();

  //   var particles = this.add.particles('red');

  //   var emitter = particles.createEmitter({
  //     speed: 100,
  //     scale: { start: 1, end: 0 },
  //     blendMode: 'ADD',
  //   });

  //   var logo = this.physics.add.image(400, 100, 'logo');

  //   logo.setVelocity(100, 200);
  //   logo.setBounce(1, 1);
  //   logo.setCollideWorldBounds(true);

  //   emitter.startFollow(logo);*/
}
function update() {
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.scale.refresh();
}
