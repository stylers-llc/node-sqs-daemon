class SqsClient {
  constructor(sqs, queueUrl) {
    this.sqs = sqs;
    this.queueUrl = queueUrl;
  }

  receiveMessage(onSuccess, onError, onEmpty) {
    const params = {
      AttributeNames: [
        'SentTimestamp',
      ],
      MaxNumberOfMessages: 1,
      MessageAttributeNames: [
        'All',
      ],
      QueueUrl: this.queueUrl,
      VisibilityTimeout: 0,
      WaitTimeSeconds: 0,
    };
    this.sqs.receiveMessage(params, (error, data) => {
      if (error) {
        onError(error);
      } else if (data.Messages) {
        onSuccess(JSON.parse(data.Messages[0].Body), data.Messages[0].ReceiptHandle);
      } else {
        onEmpty();
      }
    });
  }

  deleteMessage(receiptHandle, onSuccess, onError) {
    const deleteParams = {
      QueueUrl: this.queueUrl,
      ReceiptHandle: receiptHandle,
    };
    this.sqs.deleteMessage(deleteParams, (error, data) => {
      if (error) {
        onError(error);
      } else {
        onSuccess(data);
      }
    });
  }
}

module.exports = SqsClient;
