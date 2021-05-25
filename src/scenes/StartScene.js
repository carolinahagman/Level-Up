import Phaser, { Scene } from 'phaser';
import background from '../assets/BG.png';

let p1Display;
let p2Display;
let p1Ready = false;
let p2Ready = false;

let p1controlsText;
let p2controlsText;

let cursors;

class StartScene extends Scene {
  constructor() {
    super('preload');
  }

  preload() {
    this.load.image('background', background);
  }

  create() {
    this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      'background'
    );

    this.titleText = this.add.text(720, 120, 'Towerfall', {
      font: '40px Georgia',
      fill: '#000',
    });

    p1controlsText = this.add.text(
      200,
      250,
      ' CONTROLS\n Player 1\n\n A - Go left\n D - Go right\n W - Jump\n SPACE - Shoot',
      {
        font: '25px Courier',
        fill: '#f1f1f1',
      }
    );
    p2controlsText = this.add.text(
      1190,
      250,
      ' CONTROLS\n Player 2\n\n \u2190 - Go left\n \u2192 - Go right\n \u2191 - Jump\n ENTER - Shoot',
      {
        font: '25px Courier',
        fill: '#f1f1f1',
      }
    );

    p1Display = this.add.text(400, 700, '', {
      font: '20px Courier',
      fill: '#00ff00',
    });

    p1Display.setText(['P1 press SPACE when ready']);
    this.tweens.add({
      targets: p1Display,
      alpha: 0,
      ease: 'easeIn',
      duration: 1300,
      repeat: -1,
      yoyo: true,
    });

    p2Display = this.add.text(900, 700, '', {
      font: '20px Courier',
      fill: '#00ff00',
    });
    p2Display.setText(['P2 press UP when ready']);
    this.tweens.add({
      targets: p2Display,
      alpha: 0,
      ease: 'easeIn',
      duration: 1300,
      repeat: -1,
      yoyo: true,
    });

    this.anims.create({
      key: 'space',
    });
    this.anims.create({
      key: 'up',
    });

    // keys = this.input.keyboard.addKeys('UP, SPACE');
    cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (cursors.space.isDown) {
      p1Ready = true;
      p1Display.setText(['Player 1 is ready']);
    }
    if (cursors.up.isDown) {
      p2Ready = true;
      p2Display.setText(['Player 2 is ready']);
    }

    if (p1Ready === true) {
      this.tweens.add({
        targets: p1Display,
        alpha: 1,
        ease: 'easeIn',
        repeat: 0,
      });
    }

    if (p2Ready === true) {
      this.tweens.add({
        targets: p2Display,
        alpha: 1,
        ease: 'easeIn',
        repeat: 0,
      });
    }

    if (p2Ready === true && p1Ready === true) {
      this.startText = this.add.text(
        750,
        260,
        'Start',

        {
          fontSize: '50px Georgia',
          fill: '#000',
        }
      );

      this.startText
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.scene.start('Game'));
    }
  }
}

export default StartScene;
