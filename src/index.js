import config from './config/config';
import { Game } from 'phaser';
import { io, openSocket } from 'socket.io-client';
//import socketIOClient from 'socket.io-client';
const game = new Game(config);
