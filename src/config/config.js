import Phaser from 'phaser';
import GameScene from '../scenes/GameScene';
import StartScene from '../scenes/StartScene';

const config = {
  type: Phaser.AUTO, // tries to render in WEBGL , if it fails, it will use Canvas
  width: 1600,
  height: 900,
  parent: 'game',
  scene: [StartScene, GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};

export default config;
