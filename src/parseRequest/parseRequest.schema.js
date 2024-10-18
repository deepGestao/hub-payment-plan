const schema = {
  type: 'object',
  additionalProperties: false,
  required: [
    'id',
    'origin',
    'frequency',
    'frequencyType',
    'reason',
    'amount',
    'url',
  ],
  properties: {
    id: { type: 'string', minLength: 1, maxLength: 255 },
    origin: { type: 'string', minLength: 1, maxLength: 255 },
    frequency: { type: 'number', enum: [1, 3, 6, 12] },
    frequencyType: { type: 'string', enum: ['days', 'months'] },
    amount: { type: 'number' },
    reason: { type: 'string', minLength: 1, maxLength: 255 },
    url: { type: 'string', minLength: 1, maxLength: 512 },
  },
};

export { schema };
