import Phaser, { Scene } from 'phaser';
import background from '../assets/BG.png';

class GameOverScene extends Scene {
  constructor() {
    super('gameover');
  }

  preload() {
    this.load.image('background', background);
  }

  init(data) {
    this.winningPlayerNo = data.winningPlayerNo;
  }

  create() {
    this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      'background'
    );

    this.titleText = this.add.text(
      650,
      120,
      `Player ${this.winningPlayerNo} won!`,

      {
        fontSize: '40px',
        fill: '#000',
      }
    );

    this.startText = this.add
      .text(
        630,
        250,
        'Play again',

        {
          fontSize: '60px',
          fill: '#000',
        }
      )
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.scene.start('Game'));
  }

  update() {}
}

export default GameOverScene;
