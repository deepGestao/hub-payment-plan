import axios from 'axios';
import { getAccessToken } from '../getAccessToken/getAccessToken';

const getHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

const getConfig = (token) => ({
  headers: getHeaders(token),
  timeout: 20000,
});

const requestGateway = async (content) => {
  const token = await getAccessToken();
  const { data } = await axios.post(
    process.env.MERCADO_PAGO_PLAN,
    {
      reason: content.reason,
      auto_recurring: {
        frequency: content.frequency,
        frequency_type: content.frequencyType,
        transaction_amount: content.amount,
        currency_id: 'BRL',
      },
      payment_methods_allowed: {
        payment_types: [
          {
            id: 'credit_card',
          },
        ],
        payment_methods: [
          {
            id: 'bolbradesco',
          },
        ],
      },
      back_url: content.url,
    },
    getConfig(token),
  );
  return {
    id: data.id,
    url: data.init_point,
  };
};

export { requestGateway };
