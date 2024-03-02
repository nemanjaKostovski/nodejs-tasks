const https = require('https');

class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  addListener(eventName, fn) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(fn);
  }

  on(eventName, fn) {
    this.addListener(eventName, fn);
  }

  removeListener(eventName, fn) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter(
        (listener) => listener !== fn
      );
    }
  }

  off(eventName, fn) {
    this.removeListener(eventName, fn);
  }

  once(eventName, fn) {
    const wrapper = (...args) => {
      fn(...args);
      this.off(eventName, wrapper);
    };
    this.addListener(eventName, wrapper);
  }

  emit(eventName, ...args) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((fn) => fn(...args));
    }
  }

  listenerCount(eventName) {
    return this.listeners[eventName] ? this.listeners[eventName].length : 0;
  }

  rawListeners(eventName) {
    return this.listeners[eventName] || [];
  }
}

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    this.emit('begin');
    const start = process.hrtime();
    asyncFunc(...args, (err, data) => {
      if (err) {
        this.emit('error', err);
        return;
      }
      const end = process.hrtime(start);
      const executionTime = ((end[0] * 1e9 + end[1]) / 1e6).toFixed(2); // in milliseconds
      this.emit('end', executionTime);
      this.emit('data', data);
    });
  }
}

const fetchFromUrl = (url, cb) => {
  https
    .get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        cb(null, JSON.parse(data));
      });
    })
    .on('error', (err) => {
      cb(err, null);
    });
};

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', (executionTime) =>
  console.log(`Done with execute in ${executionTime} ms`)
);
withTime.on('data', (data) => console.log('Data received:', data));

withTime.execute(fetchFromUrl, 'https://jsonplaceholder.typicode.com/posts/1');
