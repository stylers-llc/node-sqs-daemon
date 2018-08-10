const { expect } = require('chai');
const { describe, it } = require('mocha');
const MockAWS = require('mock-aws');
const SqsClient = require('../src/sqsClient');

const mockedResponse = {
  Messages: [
    {
      Body: JSON.stringify([
        {
          EmailAddress: 'tobias.test@example.com',
          SubscriberKey: 'tobias.test@example.com',
          Attributes: [
            {
              Name: 'SubscriberKey',
              Value: 'tobias.test@example.com',
            },
            {
              Name: 'EmailAddress',
              Value: 'tobias.test@example.com',
            },
            {
              Name: 'First_Name',
              Value: 'Tobias',
            },
            {
              Name: 'Last_Name',
              Value: 'Test',
            },
            {
              Name: 'ShipToName',
              Value: 'fdf dfgdfg',
            },
            {
              Name: 'ItemCode',
              Value: 'HRB0400015',
            },
            {
              Name: 'ItemCodeDesc',
              Value: 'Organic Ginger Tea - With Wakaya Perfection a 100% Organic Pink Fijian Ginger',
            },
            {
              Name: 'UnitPrice',
              Value: '18.00',
            },
            {
              Name: 'CreditCardPaymentBalanceAmt',
              Value: '0',
            },
            {
              Name: 'PromoCode',
              Value: 'NA',
            },
            {
              Name: 'InvoiceDate',
              Value: {},
            },
          ],
        },
      ]),
      ReceiptHandle: 'mocked-receipt-handle',
    },
  ],
};

const sqs = new MockAWS.SQS();
MockAWS.mock('SQS', 'receiveMessage', mockedResponse);

describe('sqsClient', () => {
  const client = new SqsClient(
    sqs,
    process.env.AWS_queueUrl,
  );

  it('can receive messages', (done) => {
    client.receiveMessage(
      (data, receiptHandle) => {
        expect(JSON.stringify(data)).to.be.equal(mockedResponse.Messages[0].Body);
        expect(receiptHandle).to.be.equal(mockedResponse.Messages[0].ReceiptHandle);
        done();
      },
      (message, data) => console.error(message, data),
      () => console.error('Empty response'),
    );
  });
});
