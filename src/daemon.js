const Worker = require('./worker');

class Daemon {
  constructor(config) {
    this.worker = new Worker(config);
  }

  run() {
    this.worker.callback = () => this.worker.run();
    this.worker.run();
  }
}

module.exports = Daemon;
