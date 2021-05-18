import config from './config/config';
import { Game } from 'phaser';
import { io, openSocket } from 'socket.io-client';
//import socketIOClient from 'socket.io-client';
const game = new Game(config);

/** Socket **/
//const socketIO = socketIOClient.connect(SERVER_URL);
const SERVER_URL = 'http://localhost:8080';
const socket = io.connect(SERVER_URL);

//const socket = require('socket.io-client')(SERVER_URL);
/*   {
  rejectUnauthorized: false, // WARN: please do not do this in production
});
 */
//const socket = io('http://localhost:8080');
/* 
socket.on('connect_error', (err) => {
  console.log(`connect_error due to ${err.message}`);
});*/
