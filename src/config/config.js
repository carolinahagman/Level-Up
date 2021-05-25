import Phaser from 'phaser';
import GameOverScene from '../scenes/GameOverScene';
import GameScene from '../scenes/GameScene';
import StartScene from '../scenes/StartScene';

const config = {
  type: Phaser.AUTO, // tries to render in WEBGL , if it fails, it will use Canvas
  width: 1600,
  height: 900,
  parent: 'game',
  scale: {
    mode: Phaser.Scale.FIT,
  },
  scene: [StartScene, GameScene, GameOverScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
};

export default config;
