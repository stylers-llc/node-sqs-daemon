const Worker = require('./worker');

class Daemon {
  constructor(config) {
    this.worker = new Worker();
  }

  run() {
    const daemon = () => {
      this.worker.run(daemon);
    };
    daemon();
  }
}

module.exports = Daemon;
