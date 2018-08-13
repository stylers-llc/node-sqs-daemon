const log = require('./log');
const SqsClient = require('./sqsClient');

class Worker {
  constructor(config) {
    const { sqs, queueUrl, consumer, callback, timeout } = config;
    this.sqsClient = new SqsClient(sqs, queueUrl);
    this.consumer = consumer;
    this.callback = callback;
    this.timeout = timeout || 5000;
  }

  run() {
    this.getMessage();
  }

  getMessage() {
    this.sqsClient.receiveMessage(
      (message, receiptHandle) => {
        this.consumer(
          message,
          () => this.deleteMessage(message, receiptHandle),
          () => this.callback(),
        );
      },
      (error) => {
        log('FAILED to query next message from SQS', error);
        this.callback();
      },
      () => {
        log('No messages found');
        setTimeout(this.callback, this.timeout);
      },
    );
  }

  deleteMessage(message, receiptHandle, callback) {
    this.sqsClient.deleteMessage(
      receiptHandle,
      () => {
        log('Successfully submited', message);
        this.callback();
      },
      (error) => {
        log('FAILED to delete message from SQS', error);
        this.callback();
      },
    );
  }
}

module.exports = Worker;
