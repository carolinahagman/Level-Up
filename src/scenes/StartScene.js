import Phaser, { Scene } from 'phaser';
import background from '../assets/BG.png';

let p1Display;
let p2Display;
let p1Ready = false;
let p2Ready = false;

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

    this.titleText = this.add.text(
      700,
      120,
      'Towerfall',

      {
        fontSize: '40px',
        fill: '#000',
      }
    );

    p1Display = this.add.text(400, 700, '', {
      font: '20px Courier',
      fill: '#00ff00',
    });

    p1Display.setText(['P1 press SPACE when ready']);

    p2Display = this.add.text(900, 700, '', {
      font: '20px Courier',
      fill: '#00ff00',
    });
    p2Display.setText(['P2 press UP when ready']);

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

    if (p2Ready === true && p1Ready === true) {
      this.startText = this.add.text(
        720,
        250,
        'Start',

        {
          fontSize: '60px',
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
