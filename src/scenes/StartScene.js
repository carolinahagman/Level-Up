import Phaser, { Scene } from 'phaser';
import Background from '../assets/BG.png';

let P1Display;
let P2Display;
let P1Ready = false;
let P2Ready = false;

let cursors;

class StartScene extends Scene {
  constructor() {
    super('preload');
  }

  preload() {
    this.load.image('background', Background);
  }

  create() {
    this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      'background'
    );

    this.TitleText = this.add.text(
      700,
      120,
      'Towerfall',

      {
        fontSize: '40px',
        fill: '#000',
      }
    );

    P1Display = this.add.text(400, 700, '', {
      font: '20px Courier',
      fill: '#00ff00',
    });

    P1Display.setText(['P1 press SPACE when ready']);

    P2Display = this.add.text(900, 700, '', {
      font: '20px Courier',
      fill: '#00ff00',
    });
    P2Display.setText(['P2 press UP when ready']);

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
      P1Ready = true;
      P1Display.setText(['Player 1 is ready']);
    }
    if (cursors.up.isDown) {
      P2Ready = true;
      P2Display.setText(['Player 2 is ready']);
    }

    if (P2Ready === true && P1Ready === true) {
      this.StartText = this.add.text(
        720,
        250,
        'Start',

        {
          fontSize: '60px',
          fill: '#000',
        }
      );
      this.StartText.setInteractive({ useHandCursor: true }).on(
        'pointerdown',
        () => this.scene.start('Game')
      );
    }
  }
}

export default StartScene;
