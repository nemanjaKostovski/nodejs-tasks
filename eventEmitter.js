const { EventEmitter } = require('events');

function emitCount() {
  const emitter = new EventEmitter();

  let count = 0;

  const interval = setInterval(() => {
    count++;
    if (count % 4 == 0) {
      emitter.emit(
        'error',
        new Error(`Something went wrong on count: ${count}`)
      );
      return;
    }
    emitter.emit('success', count);

    if (count === 10) {
      clearInterval(interval);
      emitter.emit('end');
    }
  }, 1000);
  return emitter;
}

const counter = emitCount();

counter.on('success', (count) => {
  console.log(`Count is: ${count}`);
});

counter.on('error', (err) => {
  console.error(err.message);
});

counter.on('end', () => {
  console.info('Counter has ended');
});
