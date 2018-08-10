const Worker = require('./worker');

class Daemon {
  constructor(config) {
    this.config = config;
  }

  run() {
    const worker = new Worker(Object.assign(this.config, { callback: worker.run }));
    worker.run();
  }
}

module.exports = Daemon;
