import { DynamoDB } from 'aws-sdk';

const dynamodb = new DynamoDB();

const sendDynamoDbRequest = async (content, token, gateway) => {
  await dynamodb
    .putItem({
      TableName: `hub-payment-plans-${process.env.AWS_ENV}`,
      Item: {
        token: { S: token },
        frequency: { S: `${content.frequency}` },
        frequencyType: { S: content.frequencyType },
        reason: { S: content.reason },
        amount: { S: `${content.amount}` },
        gatewayId: { S: `mercadopago|${gateway.id}` },
        originId: { S: `${content.origin}|${content.id}` },
        createdAt: { S: `${new Date().toISOString()}` },
      },
    })
    .promise();
};

export { sendDynamoDbRequest };
