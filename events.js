const EventEmitter = require('events');
const express = require('express');

const eventEmitter = new EventEmitter();
const app = express();
app.set('eventEmitter', eventEmitter);

console.log(app.get('eventEmitter'));

// listen to the event
eventEmitter.on('myEvent', () => {
  console.log('Data received');
});

// publish an event
eventEmitter.emit('myEvent');
