const Worker = require('./worker');

class Daemon {
  constructor(config) {
    this.config = config;
  }

  run() {
    const worker = new Worker(this.config);
    worker.callback = () => worker.run();
    worker.run();
  }
}

module.exports = Daemon;
