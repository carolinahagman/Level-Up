import Phaser from 'phaser';
import { WeaponPlugin } from 'phaser3-weapon-plugin';
import Background from './assets/BG.png';
import SmallPlatform from './assets/smallplatform.svg';
import BigBlock from './assets/bigblock.svg';
import Crate from './assets/Crate.svg';
import LeftPlatform from './assets/left-platform.svg';
import LeftTile from './assets/left-tile.svg';
import LongPlatform from './assets/longplatform.svg';
import MiddlePlatform from './assets/middleplattform.svg';
import RightPlatform from './assets/right-platform.svg';
import RightTile from './assets/right-tile.svg';
import TwoBlockPlatform from './assets/twoblockplatform.svg';
import Player1 from './assets/Sprite_player.png';
import Player2 from './assets/Sprite_player2.png';

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
let player1;
let player2;

let cursors;
let weapon;
let arrow;
var arrows;
let fireRate = 500;
let nextFire = 0;

// TODO: Reset these when a player is killed
let player1CanShoot = true;
let player1DirectionIsRight = true;
let player1NumberOfArrows = 3;
let player1Lives = 1;

let player2CanShoot = true;
let player2DirectionIsRight = false;
let player2NumberOfArrows = 3;
let player2Lives = 1;

function preload() {
  this.load.image('background', Background);
  this.load.image('smallplatform', SmallPlatform, { trim: true });
  this.load.image('bigblock', BigBlock, { trim: true });
  this.load.image('crate', Crate, { trim: true });
  this.load.image('leftplatform', LeftPlatform, { trim: true });
  this.load.image('longplatform', LongPlatform, { trim: true });
  this.load.image('middleplatform', MiddlePlatform, { trim: true });
  this.load.image('rightplatform', RightPlatform, { trim: true });
  this.load.image('rightile', RightTile, { trim: true });
  this.load.image('lefttile', LeftTile, { trim: true });
  this.load.image('twoblockplatform', TwoBlockPlatform, { trim: true });

  /* arrow */
  this.load.spritesheet('arrow', Arrow, {
    frameWidth: 64,
    frameHeight: 64,
  });

  /* player 1 */
  this.load.spritesheet('dude1', Player1, {
    frameWidth: 64,
    frameHeight: 64,
    trim: true,
  });

  /* player 2 */
  this.load.spritesheet('dude2', Player2, {
    frameWidth: 64,
    frameHeight: 64,
    trim: true,
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

  /** players  */
  positionPlayer1(this);
  positionPlayer2(this);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude1', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude1', frame: 4 }],
    frameRate: 10,
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude1', { start: 13, end: 15 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'mouse',
    frames: this.anims.generateFrameNumbers('dude1', { start: 4, end: 10 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'space',
    frames: this.anims.generateFrameNumbers('dude1', { start: 3, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: 'left2',
    frames: this.anims.generateFrameNumbers('dude2', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'turn2',
    frames: [{ key: 'dude2', frame: 4 }],
    frameRate: 10,
  });

  this.anims.create({
    key: 'right2',
    frames: this.anims.generateFrameNumbers('dude2', { start: 13, end: 15 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'mouse2',
    frames: this.anims.generateFrameNumbers('dude2', { start: 4, end: 10 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'space2',
    frames: this.anims.generateFrameNumbers('dude2', { start: 3, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(player1, platforms);
  this.physics.add.collider(player2, platforms);
}

function positionPlayer1(ctx) {
  player1 = ctx.physics.add.sprite(400, 350, 'dude1', 13).setScale(1.2);
  player1.body.gravity.y = 250;

  player1.setCollideWorldBounds(true);
}
function positionPlayer2(ctx) {
  player2 = ctx.physics.add.sprite(1200, 350, 'dude2', 0).setScale(1.2);
  player2.body.gravity.y = 250;

  player2.setCollideWorldBounds(true);
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

  if (cursors.left.isDown) {
    player2DirectionIsRight = false;
    player2.setVelocityX(-160);
    player2.anims.play('left2', true);
  } else if (cursors.right.isDown) {
    player2DirectionIsRight = true;
    player2.setVelocityX(160);
    player2.anims.play('right2', true);
  } else {
    // Stops player from walking when key is not pressed
    player2.setVelocityX(0);

    player2.anims.stop(); // Have to change this so it does not turn left when stopped
  }

  if (cursors.space.isDown && player2.body.touching.down) {
    player2.setVelocityY(-450);
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
      arrow.setCollideWorldBounds(true);

      this.physics.add.collider(arrow, platforms, arrowCollideWithPlatform);
      this.physics.add.collider(arrow, player1, arrowCollideWithPlayer1);
      this.physics.add.collider(arrow, player2, arrowCollideWithPlayer2);

      player1NumberOfArrows -= 1;
      player1CanShoot = false;
      awaitNextShotPlayer1();

      arrowDisplay.setText(['Arrows left: ' + player1NumberOfArrows]);
    }
  }

  if (this.input.activePointer.isDown) {
    if (player2CanShoot && player2NumberOfArrows > 0) {
      /** Decide direction of shot **/
      let arrowVelocityY =
        cursors.up.isDown || cursors.down.isDown
          ? cursors.up.isDown
            ? -700
            : 700
          : 0;
      let arrowVelocityX =
        arrowVelocityY === 0 ? (player2DirectionIsRight ? 700 : -700) : 0;
      let arrowAngle = cursors.down.isDown
        ? 180
        : cursors.up.isDown
        ? 0
        : player2DirectionIsRight
        ? 90
        : 270;

      arrow = this.physics.add.sprite(
        player2.x,
        arrowVelocityY === 0
          ? player2.y
          : arrowVelocityY < 0
          ? player2.y - 60
          : player2.y + 60,
        'arrow'
      );
      arrow.angle = arrowAngle;
      arrow.setVelocityX(arrowVelocityX);
      arrow.setVelocityY(arrowVelocityY);
      arrow.setCollideWorldBounds(true);

      this.physics.add.collider(arrow, platforms, arrowCollideWithPlatform);
      this.physics.add.collider(arrow, player1, arrowCollideWithPlayer1);
      this.physics.add.collider(arrow, player2, arrowCollideWithPlayer2);

      player2NumberOfArrows -= 1;
      player2CanShoot = false;
      awaitNextShotPlayer2();

      arrowDisplay.setText(['Arrows left: ' + player2NumberOfArrows]);
    }
  }
}

/* Handle arrow collision with ground */
function arrowCollideWithPlatform(arrow) {
  arrow.body.allowGravity = false;
  arrow.body.allowDrag = false;
  arrow.setVelocityY(0);
}
/* Handle player collide with arrow (either pick up or get hit) */
function arrowCollideWithPlayer1(arrow) {
  console.log(arrow);
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
  }
}
function arrowCollideWithPlayer2(arrow) {
  console.log(arrow);
  if (arrow.body.allowGravity) {
    // Player is hit
    // TODO: Add game over or reset of game
    console.log('Player 2 is dead');
    player2Lives -= 1;
  } else {
    // Pick up arrow
    player2NumberOfArrows += 1;
    arrow.destroy(true);
    console.log('Pickup arrow');
  }
}

/* Make sure the player can only shoot according to the fire rate */
function awaitNextShotPlayer1() {
  setTimeout(() => {
    player1CanShoot = true;
  }, fireRate);
}
function awaitNextShotPlayer2() {
  setTimeout(() => {
    player2CanShoot = true;
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
