import uuid4 from 'uuid4';
import { parseRequest } from './parseRequest/parseRequest';
import { sendDynamoDbRequest } from './sendDynamoDbRequest/sendDynamoDbRequest';

const handler = async (event, context) => {
  console.log(event, context);
  try {
    const content = JSON.parse(event.body);
    const validate = parseRequest(content);
    if (validate) {
      const token = uuid4();
      await sendDynamoDbRequest(content, token);
      return {
        statusCode: 200,
        body: JSON.stringify({ token }),
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
