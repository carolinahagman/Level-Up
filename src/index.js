import Phaser from 'phaser';
import { WeaponPlugin } from 'phaser3-weapon-plugin';
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
import Arrow from './assets/arrow.png';

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
    render: render,
  },
};

const game = new Phaser.Game(config);

let platforms;
let player;
let player1;
let cursors;
let weapon;
let arrow;
var arrows;
let fireRate = 500;
let nextFire = 0;
let arrowDisplay;

// TODO: Reset these when a player is killed
let player1CanShoot = true;
let player1DirectionIsRight = true;
let player1NumberOfArrows = 3;
let player1Lives = 1;

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

  /* arrow */
  this.load.spritesheet('arrow', Arrow, {
    frameWidth: 64,
    frameHeight: 64,
  });

  /* player */
  this.load.spritesheet('dude', Player, {
    frameWidth: 64,
    frameHeight: 64,
  });
}

function create() {
  this.add.image(game.config.width / 2, game.config.height / 2, 'background');

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

  /** Display arrows left **/

  arrowDisplay = this.add.text(370, 750, '', {
    font: '16px Courier',
    fill: '#00ff00',
  });

  arrowDisplay.setText(['Arrows left: ' + player1NumberOfArrows]);

  /** player * */
  positionPlayer1(this);

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

  this.anims.create({
    key: 'mouse',
    frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 10 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'space',
    frames: this.anims.generateFrameNumbers('dude', { start: 3, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(player1, platforms);
}

function positionPlayer1(ctx) {
  player1 = ctx.physics.add.sprite(400, 350, 'dude', 13).setScale(1.2);
  player1.body.gravity.y = 250;

  player1.setCollideWorldBounds(true);

  player1.lastfired = 0;
}

function update() {
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.scale.refresh();

  if (cursors.left.isDown) {
    player1DirectionIsRight = false;
    player1.setVelocityX(-160);
    player1.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player1DirectionIsRight = true;
    player1.setVelocityX(160);
    player1.anims.play('right', true);
  } else {
    // Stops player from walking when key is not pressed
    player1.setVelocityX(0);

    player1.anims.stop(); // Have to change this so it does not turn left when stopped
  }

  if (cursors.space.isDown && player1.body.touching.down) {
    player1.setVelocityY(-450);
  }

  /** Shooting **/

  if (this.input.activePointer.isDown) {
    if (player1CanShoot && player1NumberOfArrows > 0) {
      /** Decide direction of shot **/
      let arrowVelocityY =
        cursors.up.isDown || cursors.down.isDown
          ? cursors.up.isDown
            ? -700
            : 700
          : 0;
      let arrowVelocityX =
        arrowVelocityY === 0 ? (player1DirectionIsRight ? 700 : -700) : 0;
      let arrowAngle = cursors.down.isDown
        ? 180
        : cursors.up.isDown
        ? 0
        : player1DirectionIsRight
        ? 90
        : 270;

      arrow = this.physics.add.sprite(
        player1.x,
        arrowVelocityY === 0
          ? player1.y
          : arrowVelocityY < 0
          ? player1.y - 60
          : player1.y + 60,
        'arrow'
      );
      arrow.angle = arrowAngle;
      arrow.setVelocityX(arrowVelocityX);
      arrow.setVelocityY(arrowVelocityY);

      this.physics.add.collider(arrow, platforms, arrowCollideWithPlatform);
      this.physics.add.collider(arrow, player1, arrowCollideWithPlayer);

      player1NumberOfArrows -= 1;
      player1CanShoot = false;
      awaitNextShot();

      arrowDisplay.setText(['Arrows left: ' + player1NumberOfArrows]);
    }
  }
}

/* Handle arrow collision with ground */
function arrowCollideWithPlatform(arrow) {
  arrow.body.allowGravity = false;
  arrow.body.allowDrag = false;
}
/* Handle player collide with arrow (either pick up or get hit) */
function arrowCollideWithPlayer(arrow) {
  if (arrow.body.allowGravity) {
    // Player is hit
    // TODO: Add game over or reset of game
    console.log('Player 1 is dead');
    player1Lives -= 1;
  } else {
    // Pick up arrow
    player1NumberOfArrows += 1;
    arrow.destroy(true);
    console.log('Pickup arrow');
    arrowDisplay.setText(['Arrows left: ' + player1NumberOfArrows]);
  }
}

/* Make sure the player can only shoot according to the fire rate */
function awaitNextShot() {
  setTimeout(() => {
    player1CanShoot = true;
  }, fireRate);
}

function render() {
  /*weapon.debug();
  game.debug.text(
    'Left Button: ' + game.input.activePointer.leftButton.isDown,
    300,
    132
  );

  game.debug.text(
    'Active Bullets: ' + arrows.countLiving() + ' / ' + bullets.total,
    32,
    32
  );
  game.debug.spriteInfo(player1, 32, 450); */
}
