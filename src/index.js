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
import Player from './assets/Sprite_player.png';

const config = {
  type: Phaser.AUTO, // tries to render in WEBGL , if it fails, it will use Canvas
  width: 1600,
  height: 900,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

let platforms;
let player;
let player1;
let cursors;

const game = new Phaser.Game(config);

function preload() {
  //this.load.spritesheet('player1', Player1, 32, 48);

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

  this.load.spritesheet('dude', Player, {
    frameWidth: 64,
    frameHeight: 64,
  });
  /* player */
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

  platforms.create(1565, 200, 'rightile');

  platforms.create(1520, 400, 'rightplatform');

  platforms.create(1430, 720, 'bigblock');

  platforms.create(1170, 460, 'smallplatform');

  platforms.create(1170, 250, 'twoblockplatform');

  platforms.create(1160, 720, 'twoblockplatform');

  /** Crates **/

  platforms.create(1340, 522, 'crate');
  platforms.create(260, 522, 'crate');

  platforms
    .create(game.config.width / 2, 122, 'crate')
    .setScale(1)
    .refreshBody();

  /*player = this.physics.add.sprite(100, 450, 'player1');
  game.physics.enable(player, Phaser.Physics.ARCADE); */

  // player = this.physics.add.sprite(100, 450, 'player');
  player1 = this.physics.add.sprite(400, 350, 'dude', 13);

  player1.setCollideWorldBounds(true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 20,
    repeat: -1,
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 13, end: 15 }),
    frameRate: 10,
    repeat: -1,
  });

  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(player1, platforms);
}
function update() {
  /*game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.scale.refresh(); */

  if (cursors.left.isDown) {
    player1.setVelocityX(-160);

    player1.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player1.setVelocityX(160);

    player1.anims.play('right', true);
  } else {
    // Stops player from walking when key is not pressed
    player1.setVelocityX(0);

    player1.anims.play('right'); // Have to change this so it does not turn left when stopped
  }

  if (cursors.up.isDown && player1.body.touching.down) {
    player1.setVelocityY(-230);
  }
}
