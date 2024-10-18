import uuid4 from 'uuid4';
import { parseRequest } from './parseRequest/parseRequest';
import { sendDynamoDbRequest } from './sendDynamoDbRequest/sendDynamoDbRequest';
import { requestGateway } from './requestGateway/requestGateway';

const handler = async (event, context) => {
  console.log(event, context);
  try {
    const content = JSON.parse(event.body);
    const validate = parseRequest(content);
    if (validate) {
      const token = uuid4();
      const result = await requestGateway(content);
      await sendDynamoDbRequest(content, token, result);
      return {
        statusCode: 200,
        body: JSON.stringify({ token, url: result.url }),
      };
    }
    return {
      statusCode: 400,
      body: '{}',
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'internal server error' }),
    };
  }
};

export { handler };
