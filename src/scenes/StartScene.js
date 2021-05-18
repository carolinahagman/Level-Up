import Phaser, { Scene } from 'phaser';
import Background from '../assets/BG.png';

class StartScene extends Scene {
  constructor() {
    super('preload');
  }

  preload() {
    this.load.image('background', Background);
  }
  create() {
    // this.socket = io();

    this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      'background'
    );

    this.TitleText = this.add.text(
      720,
      50,
      'Towerfall',

      {
        fontSize: '40px',
        fill: '#000',
      }
    );

    this.StartText = this.add.text(
      720,
      100,
      'Start',

      {
        fontSize: '40px',
        fill: '#000',
      }
    );
    this.StartText.setInteractive({ useHandCursor: true }).on(
      'pointerdown',
      () => this.scene.start('Game')
    );
  }
  update() {}
}
export default StartScene;
