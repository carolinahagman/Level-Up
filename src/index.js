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
  width: 1600,
  height: 900,
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
  this.load.image('lefttile', LeftTile);
  this.load.image('twoblockplatform', TwoBlockPlatform);
}

function create() {
  this.add.image(game.config.width / 2, game.config.height / 2, 'background');

  //this.add.image(150, 130, 'smallplatform');
  platforms = this.physics.add.staticGroup();

  /** Middle  **/
  platforms
    .create(game.config.width / 2, 200, 'middleplatform')
    .setScale(1)
    .refreshBody();

  platforms
    .create(game.config.width / 2, 400, 'smallplatform')
    .setScale(1)
    .refreshBody();

  platforms
    .create(game.config.width / 2, 620, 'middleplatform')
    .setScale(1)
    .refreshBody();

  platforms
    .create(game.config.width / 2, 870, 'longplatform')
    .setScale(1)
    .refreshBody();

  /** Left side 0 **/

  platforms.create(35, 200, 'lefttile').setScale(1).refreshBody();

  platforms.create(80, 400, 'leftplatform').setScale(1).refreshBody();

  platforms.create(170, 720, 'bigblock').setScale(1).refreshBody();

  platforms.create(430, 460, 'smallplatform').setScale(1).refreshBody();

  platforms.create(430, 250, 'twoblockplatform').setScale(1).refreshBody();

  platforms.create(440, 720, 'twoblockplatform').setScale(1).refreshBody();

  /** Right side **/

  platforms.create(1565, 200, 'rightile').setScale(1).refreshBody();

  platforms.create(1520, 400, 'rightplatform').setScale(1).refreshBody();

  platforms.create(1430, 720, 'bigblock').setScale(1).refreshBody();

  platforms.create(1170, 460, 'smallplatform').setScale(1).refreshBody();

  platforms.create(1170, 250, 'twoblockplatform').setScale(1).refreshBody();

  platforms.create(1160, 720, 'twoblockplatform').setScale(1).refreshBody();

  /** Crates **/

  platforms.create(1340, 522, 'crate').setScale(1).refreshBody();
  platforms.create(260, 522, 'crate').setScale(1).refreshBody();

  platforms
    .create(game.config.width / 2, 122, 'crate')
    .setScale(1)
    .refreshBody();
}
function update() {
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.scale.refresh();
}
